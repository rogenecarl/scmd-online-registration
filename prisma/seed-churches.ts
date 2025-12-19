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
  console.log("🌱 Seeding churches and pastors...");

  const prisma = createSeedPrismaClient();

  // Get all required divisions
  const divisionNames = [
    "Pine",
    "Laurel",
    "Cassia",
    "Sycamore",
    "Palm",
    "Narra",
    "Molave",
    "Mahogany",
  ];

  const divisions: Record<string, { id: string; name: string }> = {};

  for (const name of divisionNames) {
    const division = await prisma.division.findUnique({
      where: { name },
    });

    if (!division) {
      console.error(
        `❌ ${name} division not found. Please run seed:divisions first.`
      );
      process.exit(1);
    }

    divisions[name] = division;
    console.log(`✓ Found ${name} division`);
  }

  // Churches and their pastors organized by division
  const churchesByDivision: Record<
    string,
    Array<{ churchName: string; pastorName: string }>
  > = {
    Pine: [
      {
        churchName: "Kapatagan Foursquare Gospel Church",
        pastorName: "Rev. Leonardo & Ptra. Lorna Diaz",
      },
      {
        churchName: "Mainit Foursquare Gospel Church",
        pastorName: "Ptr. Honorato & Ptra Tessie Tado",
      },
      {
        churchName: "Marawer Foursquare Gospel Church",
        pastorName: "Ptr. Ervinly & Ptra Liza Sepe",
      },
      {
        churchName: "Tibolo Foursquare Gospel Church",
        pastorName: "Ptr. Japet & Ptra Lorilyn Anaclito",
      },
      {
        churchName: "Campo Foursquare Gospel Church",
        pastorName: "Ptr. Lawrence Redondiez",
      },
      {
        churchName: "Binaton Foursquare Gospel Church",
        pastorName: "Ptr. Glen & Ptra Ailyn Velos",
      },
      {
        churchName: "Balutakay Foursquare Gospel Church",
        pastorName: "Ptr. Emeterio & Ptra. Emma Tanio",
      },
    ],
    Laurel: [
      {
        churchName: "Balasiao Foursquare Gospel Church",
        pastorName: "Ptr. Orchie Calimot",
      },
      {
        churchName: "Malalag Foursquare Gospel Church",
        pastorName: "Ptr. Nemuel Gacita & Ptra. Flordiliza Gacita",
      },
      {
        churchName: "Caputian Foursquare Gospel Church",
        pastorName: "Ptra. Forataliza Heramil",
      },
      {
        churchName: "Kiblagon Foursquare Gospel Church",
        pastorName: "Ptr. Alex Heramil",
      },
      {
        churchName: "Kiblawan Foursquare Gospel Church",
        pastorName: "Ptr. Ephraim Montebon",
      },
      {
        churchName: "Mckenly Foursquare Gospel Church",
        pastorName: "Ptr. Rodel Montecalvo",
      },
      {
        churchName: "Padada Foursquare Gospel Church",
        pastorName: "Ptr. Lodiver Marcelo and Ptra. Madeline Marcelo",
      },
      {
        churchName: "Domino Foursquare Gospel Church",
        pastorName: "Ptra. Jesabeth Ang.",
      },
      {
        churchName: "Hagonoy Foursquare Gospel Church",
        pastorName: "Ptra. Susan Cadayona",
      },
      {
        churchName: "Sulop Foursquare Gospel Church",
        pastorName: "Rev. Rodolfo Cadayona",
      },
      {
        churchName: "Solongvale Foursquare Gospel Church",
        pastorName: "Ptr. Ruben Ferenal",
      },
    ],
    Cassia: [
      {
        churchName: "Bansalan Foursquare Gospel Church",
        pastorName: "Rev. Jerry Cabasaan",
      },
      {
        churchName: "Mabunga Foursquare Gospel Church",
        pastorName: "Ptr. Adelaida Juntilla",
      },
      {
        churchName: "Km 71 Foursquare Gospel Church",
        pastorName: "Ptr. Garry Velos",
      },
      {
        churchName: "New Visayas Foursquare Gospel Church",
        pastorName: "Ptr. Romeo Samoranos Jr.",
      },
      {
        churchName: "Matanao Foursquare Gospel Church",
        pastorName: "Ptra. Gloria Catiquista",
      },
      {
        churchName: "Manga Foursquare Gospel Church",
        pastorName: "Ptr. Jefferson Diandan",
      },
      {
        churchName: "Lumbang Foursquare Gospel Church",
        pastorName: "Ptr. Edwin Elentorio",
      },
      {
        churchName: "Kapoc Foursquare Gospel Church",
        pastorName: "Ptr. Rodolfo Elentorio Jr.",
      },
      {
        churchName: "Tagaytay Foursquare Gospel Church",
        pastorName: "Ptr. Disodado Galigao",
      },
      {
        churchName: "Colon Sabak Foursquare Gospel Church",
        pastorName: "Ptr. Eleonor Encallado",
      },
      {
        churchName: "Kimlawis Foursquare Gospel Church",
        pastorName: "Ptr. Disodado Galigao",
      },
      {
        churchName: "San Jose Foursquare Gospel Church",
        pastorName: "Ptr. Romeo Samoranos Jr.",
      },
      {
        churchName: "New Quezon Foursquare Gospel Church",
        pastorName: "Ptr. Judith Maglasang",
      },
      {
        churchName: "Kauswagan Foursquare Gospel Church",
        pastorName: "Ptr. Rommel Amoy",
      },
    ],
    Sycamore: [
      {
        churchName: "Matti Foursquare Gospel Church",
        pastorName: "Ptr. Nemart Baluyot",
      },
      {
        churchName: "Jca Foursquare Gospel Church",
        pastorName: "Rev. Aijelon Boholst",
      },
      {
        churchName: "Digos City Foursquare Gospel Church",
        pastorName: "Ptra. Maschil Boholst & Ptr. Reggie Boholst",
      },
      {
        churchName: "Camucaan Foursquare Gospel Church",
        pastorName: "Ptra. Emelyn Lurica",
      },
      {
        churchName: "Living Well Foursquare Gospel Church",
        pastorName: "Ptr. Markray Mequiabas",
      },
      {
        churchName: "Malalag Poblacion Foursquare Gospel Church",
        pastorName: "Ptr. Patrick Pe",
      },
      {
        churchName: "Cfc Foursquare Gospel Church",
        pastorName: "Ptr. Jimuel Rosalijos",
      },
      {
        churchName: "Rizal Foursquare Gospel Church",
        pastorName: "Ptr. Nathaniel Fampulmi & Ptra. Arthea Fampulmi",
      },
    ],
    Palm: [
      {
        churchName: "Migdolog Foursquare Gospel Church",
        pastorName: "Ptr. Leonardo Malanas & Ptra. Joseline Malanas",
      },
      {
        churchName: "Cabilon Foursquare Gospel Church",
        pastorName: "Ptr. Anthony Malanas & Ptra. Raponcel Malanas",
      },
      {
        churchName: "Bankoni Foursquare Gospel Church",
        pastorName: "Ptr. Anthony Malanas & Ptra. Raponcel Malanas",
      },
      {
        churchName: "Luang, Buiguis Foursquare Gospel Church",
        pastorName: "Ptr. Renato Capitan",
      },
      {
        churchName: "Caburan Foursquare Gospel Church",
        pastorName: "Ptr. Leo Cachuela",
      },
      {
        churchName: "Pag-asa Foursquare Gospel Church",
        pastorName: "Ptra. Jovelita Cachuela",
      },
      {
        churchName: "Marabatuan Foursquare Gospel Church",
        pastorName: "Ptr. Penieto Padayag",
      },
      {
        churchName: "Kabagtukan Foursquare Gospel Church",
        pastorName: "Ptr. Rolly Gapa & Ptra. Jenilyn Gapa",
      },
      {
        churchName: "Meybio Foursquare Gospel Church",
        pastorName: "Ptr. Leonard Malanas & Ptra. Mary Ann Malanas",
      },
      {
        churchName: "Carahayan Foursquare Gospel Church",
        pastorName: "Ptra. Emilyn Rivera",
      },
      {
        churchName: "Tabayon Foursquare Gospel Church",
        pastorName: "Ptr. Jeric Dawa",
      },
    ],
    Narra: [
      {
        churchName: "Astorga Foursquare Gospel Church",
        pastorName: "Ptr. Jeremiah Ante & Ptra. Lygin Ante",
      },
      {
        churchName: "Pitogo Foursquare Gospel Church",
        pastorName: "Ptr. Lorenel Alanza & Ptra. Mitch Alanza",
      },
      {
        churchName: "Coronon Foursquare Gospel Church",
        pastorName: "Ptr. Rolly Hemildas & Ptra. Lowelyn Hemildas",
      },
      {
        churchName: "Langan Foursquare Gospel Church",
        pastorName: "Ptr. Castro & Ptra. Wilma Castro",
      },
      {
        churchName: "Lubo Foursquare Gospel Church",
        pastorName: "Ptr. Jormarie Sulmaca Jr & Ptra. Antoneth Sulmaca",
      },
      {
        churchName: "Bagumbayan Foursquare Gospel Church",
        pastorName: "Ptra. Lilia Eting & Bro. Bonifacio Eting",
      },
      {
        churchName: "Ragubrob Foursquare Gospel Church",
        pastorName: "Ptr. Christopher E. Barra",
      },
      {
        churchName: "Bato Foursquare Gospel Church",
        pastorName: "Ptr. Cristofer Liston & Ptra. Theresa Liston",
      },
      {
        churchName: "Kiblan Foursquare Gospel Church",
        pastorName: "Bro. Daniel Eting & Ptra. Analyn Eting",
      },
      {
        churchName: "New Hope Foursquare Gospel Church",
        pastorName: "Ptr. Jerome Domaguing & Ptra. Jean Domaguing",
      },
    ],
    Molave: [
      {
        churchName: "Upper Bala Foursquare Gospel Church",
        pastorName: "Ptr. June A. Longakit & Ptra. Mae Ann Longakit",
      },
      {
        churchName: "Acasia Foursquare Gospel Church",
        pastorName: "Ptr. Jaycar Simbajon",
      },
      {
        churchName: "Living Hope Foursquare Gospel Church",
        pastorName: "Ptra.Geraldine Norab & Ptr. Nemrod Norab",
      },
      {
        churchName: "Centro Malongon Foursquare Gospel Church",
        pastorName: "Ptr. Allan Macalolot & Ptra. Jessica Macalolot",
      },
      {
        churchName: "New Ilocos Foursquare Gospel Church",
        pastorName: "Ptr. Jake Villarino",
      },
      {
        churchName: "Malongon Foursquare Gospel Church",
        pastorName: "Ptr. Xyros Jake M. Oñez",
      },
      {
        churchName: "Magsaysay Foursquare Gospel Church",
        pastorName: "Ptr. Roberto Tambalila & Ptra. Judye Tambalila",
      },
      {
        churchName: "Lower Bala Foursquare Gospel Church",
        pastorName: "Ptr. Renenoy B. Bellebelle & Ptra. Luzviminda O. Bellebelle",
      },
      {
        churchName: "Makilala Foursquare Gospel Church",
        pastorName: "Ptr. Elias Norab Sr. & Ptra. Leoni Norab",
      },
    ],
    Mahogany: [
      {
        churchName: "Sta. Maria Foursquare Gospel Church",
        pastorName: "Ptr. Julito Etang",
      },
      {
        churchName: "Hillside Foursquare Gospel Church",
        pastorName: "Ptr Cyril Pequit",
      },
      {
        churchName: "Cabalantian Foursquare Gospel Church",
        pastorName: "Ptr. Elmer Quito",
      },
      {
        churchName: "Bitu Foursquare Gospel Church",
        pastorName: "Ptra. Elmira Etang",
      },
      {
        churchName: "Tubalan Foursquare Gospel Church",
        pastorName: "Ptr. De Asis",
      },
      {
        churchName: "Agdao Foursquare Gospel Church",
        pastorName: "Ptr. De Asis",
      },
      {
        churchName: "Malita Foursquare Gospel Church",
        pastorName: "Ptr. Hermogenes Torres",
      },
      {
        churchName: "Mana Foursquare Gospel Church",
        pastorName: "Ptra. Jovelyn Torres",
      },
    ],
  };

  console.log("\n⛪ Creating churches and pastors...");

  let totalChurches = 0;

  for (const [divisionName, churches] of Object.entries(churchesByDivision)) {
    console.log(`\n📍 Processing ${divisionName} Division churches...`);
    const division = divisions[divisionName];

    for (const data of churches) {
      try {
        // Upsert the church (name is unique across all churches)
        const church = await prisma.church.upsert({
          where: { name: data.churchName },
          update: {
            divisionId: division.id,
          },
          create: {
            name: data.churchName,
            divisionId: division.id,
          },
        });

        console.log(`✓ Church created/updated: ${data.churchName}`);

        // Upsert the pastor for this church
        await prisma.pastor.upsert({
          where: {
            churchId: church.id,
          },
          update: {
            name: data.pastorName,
          },
          create: {
            name: data.pastorName,
            churchId: church.id,
          },
        });

        console.log(`  ✓ Pastor assigned: ${data.pastorName}`);
        totalChurches++;
      } catch (error) {
        console.error(`❌ Error creating church ${data.churchName}:`, error);
      }
    }
  }

  console.log("\n✨ Churches and pastors seeding completed!");
  console.log(`📊 Total churches seeded: ${totalChurches}`);

  for (const [divisionName, churches] of Object.entries(churchesByDivision)) {
    console.log(`   - ${divisionName} Division: ${churches.length} churches`);
  }

  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error("❌ Churches seeding failed:", e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
