import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/lib/generated/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// Create standalone Prisma client for seeding (avoids path alias issues)
function createSeedPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is required");
  }

  const pool = new Pool({
    connectionString,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });

  const adapter = new PrismaPg(pool);

  return new PrismaClient({ adapter });
}

/**
 * Convert church name to email format (all lowercase - Better Auth normalizes emails)
 * Example: "Kapatagan Foursquare Gospel Church" → "kapataganfgc@scmd.org"
 */
function churchNameToEmail(churchName: string): string {
  const nameWithoutFGC = churchName
    .replace(/\s*Foursquare Gospel Church\s*/i, "")
    .trim();

  const sanitized = nameWithoutFGC
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();

  return `${sanitized}fgc@scmd.org`;
}

async function main() {
  console.log("🌱 Seeding president users for all churches...");
  console.log("   (Email + Password only - Presidents will complete profile on login)\n");

  const prisma = createSeedPrismaClient();

  // Create Better Auth instance for seeding
  const auth = betterAuth({
    database: prismaAdapter(prisma, {
      provider: "postgresql",
    }),
    emailAndPassword: {
      enabled: true,
    },
    user: {
      additionalFields: {
        role: {
          type: "string",
          required: false,
          defaultValue: "USER",
          input: false,
        },
        churchId: {
          type: "string",
          required: false,
          input: false,
        },
      },
    },
    rateLimit: {
      enabled: false,
    },
  });

  // Fetch all churches from the database
  const churches = await prisma.church.findMany({
    include: {
      division: true,
    },
    orderBy: [
      { division: { name: "asc" } },
      { name: "asc" },
    ],
  });

  if (churches.length === 0) {
    console.error("❌ No churches found. Please run seed:churches first.");
    process.exit(1);
  }

  console.log(`📊 Found ${churches.length} churches in the database`);
  console.log("👤 Creating president accounts (email + password only)...\n");

  const password = "UFYCamp@2024";
  const createdPresidents: Array<{
    churchName: string;
    divisionName: string;
    email: string;
  }> = [];

  let currentDivision = "";

  for (const church of churches) {
    if (church.division.name !== currentDivision) {
      currentDivision = church.division.name;
      console.log(`\n📍 ${currentDivision} Division:`);
    }

    const email = churchNameToEmail(church.name);

    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        // Update existing user: clear name, set PRESIDENT role, NO church assignment
        await prisma.user.update({
          where: { email },
          data: {
            name: "",
            role: "PRESIDENT",
            churchId: null, // No church - user will select on profile completion
          },
        });
        console.log(`   ⚠️  Updated: ${email}`);
        createdPresidents.push({
          churchName: church.name,
          divisionName: church.division.name,
          email,
        });
        continue;
      }

      // Create new user with Better Auth
      const result = await auth.api.signUpEmail({
        body: {
          name: "President",
          email,
          password,
        },
      });

      if (result && result.user) {
        // Update: clear name, set PRESIDENT role, NO church assignment
        await prisma.user.update({
          where: { id: result.user.id },
          data: {
            name: "",
            role: "PRESIDENT",
            churchId: null, // No church - user will select on profile completion
          },
        });
        console.log(`   ✅ Created: ${email}`);
        createdPresidents.push({
          churchName: church.name,
          divisionName: church.division.name,
          email,
        });
      } else {
        console.error(`   ❌ Signup failed for: ${email}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message.includes("already exists") ||
          error.message.includes("User already exists")
        ) {
          console.log(`   ⚠️  User exists: ${email}`);
          try {
            await prisma.user.update({
              where: { email },
              data: {
                name: "",
                role: "PRESIDENT",
                churchId: null,
              },
            });
            console.log(`   ✅ Updated to PRESIDENT: ${email}`);
            createdPresidents.push({
              churchName: church.name,
              divisionName: church.division.name,
              email,
            });
          } catch (updateError) {
            console.error(`   ❌ Error updating:`, updateError);
          }
        } else {
          console.error(`   ❌ Error creating ${email}:`, error.message);
        }
      } else {
        console.error(`   ❌ Error creating ${email}:`, error);
      }
    }
  }

  console.log("\n✨ President seeding completed!");
  console.log(`📊 Total accounts created/updated: ${createdPresidents.length}`);

  if (createdPresidents.length > 0) {
    console.log("\n📋 President Credentials:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`Password for ALL accounts: ${password}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    const byDivision: Record<string, typeof createdPresidents> = {};
    for (const p of createdPresidents) {
      if (!byDivision[p.divisionName]) {
        byDivision[p.divisionName] = [];
      }
      byDivision[p.divisionName].push(p);
    }

    for (const [division, presidents] of Object.entries(byDivision)) {
      console.log(`📍 ${division} Division (${presidents.length} churches):`);
      for (const p of presidents) {
        console.log(`   ${p.email.padEnd(45)} | ${p.churchName}`);
      }
      console.log("");
    }

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("\n📌 Login Instructions:");
    console.log("   1. Go to the login page");
    console.log("   2. Use your church email (e.g., kapataganfgc@scmd.org)");
    console.log(`   3. Use password: ${password}`);
    console.log("   4. Complete your profile (name, division, church)");
    console.log("   5. You will be redirected to the President Dashboard");
  }

  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error("❌ President seeding failed:", e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
