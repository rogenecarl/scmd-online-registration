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

async function main() {
  console.log("🌱 Seeding president users...");

  const prisma = createSeedPrismaClient();

  // Create Better Auth instance for seeding (minimal config, no rate limiting)
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
    // Disable rate limiting for seeding
    rateLimit: {
      enabled: false,
    },
  });

  // Sample president users (they will complete their profile after login)
  const presidents = [
    {
      name: "President One",
      email: "president1@scmd.org",
      password: "President@2024",
    },
    {
      name: "President Two",
      email: "president2@scmd.org",
      password: "President@2024",
    },
    {
      name: "President Three",
      email: "president3@scmd.org",
      password: "President@2024",
    },
    {
      name: "President Four",
      email: "president4@scmd.org",
      password: "President@2024",
    },
    {
      name: "President Five",
      email: "president5@scmd.org",
      password: "President@2024",
    },
  ];

  console.log("\n👤 Creating president users...");
  console.log("   (Presidents will complete their profile after login)\n");

  const createdPresidents: typeof presidents = [];

  for (const president of presidents) {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: president.email },
      });

      if (existingUser) {
        // Update existing user to PRESIDENT role
        await prisma.user.update({
          where: { email: president.email },
          data: {
            role: "PRESIDENT",
          },
        });
        console.log(`⚠️  User already exists, updated to PRESIDENT: ${president.email}`);
        createdPresidents.push(president);
        continue;
      }

      // Use Better Auth's signUpEmail API
      const result = await auth.api.signUpEmail({
        body: {
          name: president.name,
          email: president.email,
          password: president.password,
        },
      });

      if (result) {
        // Update the user role to PRESIDENT (no church assigned yet)
        await prisma.user.update({
          where: { email: president.email },
          data: {
            role: "PRESIDENT",
          },
        });
        console.log(`✅ Created president: ${president.email}`);
        createdPresidents.push(president);
      }
    } catch (error) {
      if (error instanceof Error) {
        // Check for "already exists" error
        if (
          error.message.includes("already exists") ||
          error.message.includes("User already exists")
        ) {
          console.log(`⚠️  President user already exists: ${president.email}`);
          // Try to update role if user exists
          try {
            await prisma.user.update({
              where: { email: president.email },
              data: {
                role: "PRESIDENT",
              },
            });
            console.log(`✅ Updated to PRESIDENT: ${president.email}`);
            createdPresidents.push(president);
          } catch (updateError) {
            console.error(`❌ Error updating president role:`, updateError);
          }
        } else {
          console.error(
            `❌ Error creating president user ${president.email}:`,
            error.message
          );
        }
      } else {
        console.error(`❌ Error creating president user ${president.email}:`, error);
      }
    }
  }

  console.log("\n✨ President seeding completed!");

  if (createdPresidents.length > 0) {
    console.log("\n📋 President Credentials:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    createdPresidents.forEach((president) => {
      console.log(`Email:    ${president.email}`);
      console.log(`Password: ${president.password}`);
      console.log(`Role:     PRESIDENT`);
      console.log(`Church:   Not assigned (complete profile after login)`);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    });

    console.log("\n📌 Next Steps:");
    console.log("   1. Presidents log in with their credentials");
    console.log("   2. They will be redirected to complete their profile");
    console.log("   3. Select their division and church");
    console.log("   4. Then they can register delegates for events");
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
