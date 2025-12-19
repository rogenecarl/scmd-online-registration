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
  console.log("🌱 Seeding admin users...");

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
      },
    },
    // Disable rate limiting for seeding
    rateLimit: {
      enabled: false,
    },
  });

  const admins = [
    {
      name: "System Administrator",
      email: "admin@scmd.org",
      password: "Admin@2024",
    },
  ];

  console.log("\n👑 Creating admin users...");

  for (const admin of admins) {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: admin.email },
      });

      if (existingUser) {
        // Update existing user to ADMIN role
        await prisma.user.update({
          where: { email: admin.email },
          data: { role: "ADMIN" },
        });
        console.log(`⚠️  User already exists, updated role to ADMIN: ${admin.email}`);
        continue;
      }

      // Use Better Auth's signUpEmail API
      const result = await auth.api.signUpEmail({
        body: {
          name: admin.name,
          email: admin.email,
          password: admin.password,
        },
      });

      if (result) {
        // Update the user role to ADMIN
        await prisma.user.update({
          where: { email: admin.email },
          data: { role: "ADMIN" },
        });
        console.log(`✅ Created admin user: ${admin.email}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        // Check for "already exists" error
        if (
          error.message.includes("already exists") ||
          error.message.includes("User already exists")
        ) {
          console.log(`⚠️  Admin user already exists: ${admin.email}`);
          // Try to update role if user exists
          try {
            await prisma.user.update({
              where: { email: admin.email },
              data: { role: "ADMIN" },
            });
            console.log(`✅ Updated role to ADMIN for: ${admin.email}`);
          } catch (updateError) {
            console.error(`❌ Error updating admin role:`, updateError);
          }
        } else {
          console.error(
            `❌ Error creating admin user ${admin.email}:`,
            error.message
          );
        }
      } else {
        console.error(`❌ Error creating admin user ${admin.email}:`, error);
      }
    }
  }

  console.log("\n✨ Admin seeding completed!");
  console.log("\n📋 Admin Credentials:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  admins.forEach((admin) => {
    console.log(`Email: ${admin.email}`);
    console.log(`Password: ${admin.password}`);
    console.log(`Role: ADMIN`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  });

  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error("❌ Admin seeding failed:", e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
