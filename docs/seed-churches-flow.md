import prisma from "../src/lib/prisma";

async function seedChurches() {
  console.log("🌱 Seeding churches and pastors...");

  // Get the first admin user to use as createdBy
  const adminUser = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  if (!adminUser) {
    console.error("❌ No admin user found. Please run seed:admin first.");
    process.exit(1);
  }

  console.log(`✓ Using admin user: ${adminUser.email}`);

  // Get the Pine division
  const pineDivision = await prisma.division.findUnique({
    where: { name: "Pine" },
  });

  if (!pineDivision) {
    console.error(
      "❌ Pine division not found. Please run seed:division first.",
    );
    process.exit(1);
  }

  console.log(`✓ Found Pine division`);

  // Get the Laurel division
  const laurelDivision = await prisma.division.findUnique({
    where: { name: "Laurel" },
  });

  if (!laurelDivision) {
    console.error(
      "❌ Laurel division not found. Please run seed:division first.",
    );
    process.exit(1);
  }

  console.log(`✓ Found Laurel division`);

  // Get the Cassia division
  const cassiaDivision = await prisma.division.findUnique({
    where: { name: "Cassia" },
  });

  if (!cassiaDivision) {
    console.error(
      "❌ Cassia division not found. Please run seed:division first.",
    );
    process.exit(1);
  }

  console.log(`✓ Found Cassia division`);

  // Get the Sycamore division
  const sycamoreDivision = await prisma.division.findUnique({
    where: { name: "Sycamore" },
  });

  if (!sycamoreDivision) {
    console.error(
      "❌ Sycamore division not found. Please run seed:division first.",
    );
    process.exit(1);
  }

  console.log(`✓ Found Sycamore division`);

  // Get the Palm division
  const palmDivision = await prisma.division.findUnique({
    where: { name: "Palm" },
  });

  if (!palmDivision) {
    console.error(
      "❌ Palm division not found. Please run seed:division first.",
    );
    process.exit(1);
  }

  console.log(`✓ Found Palm division`);

  // Get the Narra division
  const narraDivision = await prisma.division.findUnique({
    where: { name: "Narra" },
  });

  if (!narraDivision) {
    console.error(
      "❌ Narra division not found. Please run seed:division first.",
    );
    process.exit(1);
  }

  console.log(`✓ Found Narra division`);

  // Get the Molave division
  const molaveDivision = await prisma.division.findUnique({
    where: { name: "Molave" },
  });

  if (!molaveDivision) {
    console.error(
      "❌ Molave division not found. Please run seed:division first.",
    );
    process.exit(1);
  }

  console.log(`✓ Found Molave division`);

  // Get the Mahogany division
  const mahoganyDivision = await prisma.division.findUnique({
    where: { name: "Mahogany" },
  });

  if (!mahoganyDivision) {
    console.error(
      "❌ Mahogany division not found. Please run seed:division first.",
    );
    process.exit(1);
  }

  console.log(`✓ Found Mahogany division`);

  // Churches and their pastors in Pine Division
  const pineChurches = [
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
  ];

  // Churches and their pastors in Laurel Division
  const laurelChurches = [
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
  ];

  // Churches and their pastors in Cassia Division
  const cassiaChurches = [
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
  ];

  // Churches and their pastors in Sycamore Division
  const sycamoreChurches = [
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
      churchName: "Rizal Foursquare Gospel Church  ",
      pastorName: "Ptr. Nathaniel Fampulmi & Ptra. Ar thea Fampulmi",
    },
  ];

  // Churches and their pastors in Palm Division
  const palmChurches = [
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
  ];

  // Churches and their pastors in Narra Division
  const narraChurches = [
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
  ];

  // Churches and their pastors in Molave Division
  const molaveChurches = [
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
      churchName: "Foursquare Gospel Church   Foursquare Gospel Church",
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
  ];

  // Churches and their pastors in Mahogany Division
  const mahoganyChurches = [
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
  ];

  console.log("\n⛪ Creating churches and pastors...");

  // Process Pine Division churches
  console.log("\n📍 Processing Pine Division churches...");
  for (const data of pineChurches) {
    try {
      // Upsert the church
      const church = await prisma.church.upsert({
        where: {
          name_divisionId: {
            name: data.churchName,
            divisionId: pineDivision.id,
          },
        },
        update: {},
        create: {
          name: data.churchName,
          divisionId: pineDivision.id,
          createdById: adminUser.id,
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
    } catch (error) {
      console.log(`❌ Error creating church ${data.churchName}:`, error);
    }
  }

  // Process Laurel Division churches
  console.log("\n📍 Processing Laurel Division churches...");
  for (const data of laurelChurches) {
    try {
      // Upsert the church
      const church = await prisma.church.upsert({
        where: {
          name_divisionId: {
            name: data.churchName,
            divisionId: laurelDivision.id,
          },
        },
        update: {},
        create: {
          name: data.churchName,
          divisionId: laurelDivision.id,
          createdById: adminUser.id,
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
    } catch (error) {
      console.log(`❌ Error creating church ${data.churchName}:`, error);
    }
  }

  // Process Cassia Division churches
  console.log("\n📍 Processing Cassia Division churches...");
  for (const data of cassiaChurches) {
    try {
      // Upsert the church
      const church = await prisma.church.upsert({
        where: {
          name_divisionId: {
            name: data.churchName,
            divisionId: cassiaDivision.id,
          },
        },
        update: {},
        create: {
          name: data.churchName,
          divisionId: cassiaDivision.id,
          createdById: adminUser.id,
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
    } catch (error) {
      console.error(`❌ Error creating church ${data.churchName}:`, error);
    }
  }

  // Process Sycamore Division churches
  console.log("\n📍 Processing Sycamore Division churches...");
  for (const data of sycamoreChurches) {
    try {
      // Upsert the church
      const church = await prisma.church.upsert({
        where: {
          name_divisionId: {
            name: data.churchName,
            divisionId: sycamoreDivision.id,
          },
        },
        update: {},
        create: {
          name: data.churchName,
          divisionId: sycamoreDivision.id,
          createdById: adminUser.id,
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
    } catch (error) {
      console.error(`❌ Error creating church ${data.churchName}:`, error);
    }
  }

  // Process Palm Division churches
  console.log("\n📍 Processing Palm Division churches...");
  for (const data of palmChurches) {
    try {
      // Upsert the church
      const church = await prisma.church.upsert({
        where: {
          name_divisionId: {
            name: data.churchName,
            divisionId: palmDivision.id,
          },
        },
        update: {},
        create: {
          name: data.churchName,
          divisionId: palmDivision.id,
          createdById: adminUser.id,
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
    } catch (error) {
      console.error(`❌ Error creating church ${data.churchName}:`, error);
    }
  }

  // Process Narra Division churches
  console.log("\n📍 Processing Narra Division churches...");
  for (const data of narraChurches) {
    try {
      // Upsert the church
      const church = await prisma.church.upsert({
        where: {
          name_divisionId: {
            name: data.churchName,
            divisionId: narraDivision.id,
          },
        },
        update: {},
        create: {
          name: data.churchName,
          divisionId: narraDivision.id,
          createdById: adminUser.id,
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
    } catch (error) {
      console.error(`❌ Error creating church ${data.churchName}:`, error);
    }
  }

  // Process Molave Division churches
  console.log("\n📍 Processing Molave Division churches...");
  for (const data of molaveChurches) {
    try {
      // Upsert the church
      const church = await prisma.church.upsert({
        where: {
          name_divisionId: {
            name: data.churchName,
            divisionId: molaveDivision.id,
          },
        },
        update: {},
        create: {
          name: data.churchName,
          divisionId: molaveDivision.id,
          createdById: adminUser.id,
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
    } catch (error) {
      console.error(`❌ Error creating church ${data.churchName}:`, error);
    }
  }

  // Process Mahogany Division churches
  console.log("\n📍 Processing Mahogany Division churches...");
  for (const data of mahoganyChurches) {
    try {
      // Upsert the church
      const church = await prisma.church.upsert({
        where: {
          name_divisionId: {
            name: data.churchName,
            divisionId: mahoganyDivision.id,
          },
        },
        update: {},
        create: {
          name: data.churchName,
          divisionId: mahoganyDivision.id,
          createdById: adminUser.id,
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
    } catch (error) {
      console.error(`❌ Error creating church ${data.churchName}:`, error);
    }
  }

  console.log("\n✨ Churches and pastors seeding completed!");
  console.log(
    `📊 Total churches seeded: ${pineChurches.length + laurelChurches.length + cassiaChurches.length + sycamoreChurches.length + palmChurches.length + narraChurches.length + molaveChurches.length + mahoganyChurches.length}`,
  );
  console.log(`   - Pine Division: ${pineChurches.length} churches`);
  console.log(`   - Laurel Division: ${laurelChurches.length} churches`);
  console.log(`   - Cassia Division: ${cassiaChurches.length} churches`);
  console.log(`   - Sycamore Division: ${sycamoreChurches.length} churches`);
  console.log(`   - Palm Division: ${palmChurches.length} churches`);
  console.log(`   - Narra Division: ${narraChurches.length} churches`);
  console.log(`   - Molave Division: ${molaveChurches.length} churches`);
  console.log(`   - Mahogany Division: ${mahoganyChurches.length} churches`);
}

seedChurches()
  .catch((error) => {
    console.error("❌ Error seeding churches:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
