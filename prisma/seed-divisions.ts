import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/lib/generated/prisma";

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
  console.log("🌱 Seeding divisions...");

  const prisma = createSeedPrismaClient();

  const divisions = [
    "Cassia",
    "Laurel",
    "Mahogany",
    "Molave",
    "Narra",
    "Palm",
    "Pine",
    "Sycamore",
  ];

  for (const divisionName of divisions) {
    await prisma.division.upsert({
      where: { name: divisionName },
      update: {},
      create: {
        name: divisionName,
      },
    });
    console.log(`✓ Division "${divisionName}" created/updated`);
  }

  console.log("✨ Divisions seeding completed!");

  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error("❌ Division seeding failed:", e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
