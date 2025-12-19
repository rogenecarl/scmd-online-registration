import prisma from "../src/lib/prisma";

async function seedDivisions() {
  console.log("🌱 Seeding divisions...");

  // Get the first admin user to use as createdBy
  const adminUser = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  if (!adminUser) {
    console.error("❌ No admin user found. Please run seed:admin first.");
    process.exit(1);
  }

  console.log(`✓ Using admin user: ${adminUser.email}`);

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
        createdById: adminUser.id,
      },
    });
    console.log(`✓ Division "${divisionName}" created/updated`);
  }

  console.log("✨ Divisions seeding completed!");
}

seedDivisions()
  .catch((error) => {
    console.error("Error seeding divisions:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
