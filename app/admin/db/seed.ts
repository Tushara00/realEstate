import { db } from "./index.ts"; // your db connection
import { citiesTable, housesTable } from "./schema.ts";


async function seed() {
  console.log("🌱 Seeding database...");

  // 1️⃣ Insert cities
  const cities = await db
    .insert(citiesTable)
    .values([
      {
        name: "Dhaka",
        slug: "dhaka",
        state: "Dhaka",
        country: "Bangladesh",
      },
      {
        name: "Chittagong",
        slug: "chittagong",
        state: "Chattogram",
        country: "Bangladesh",
      },
    ])
    .returning(); // important!

  const dhakaId = cities.find((c) => c.slug === "dhaka")!.id;
  const chittagongId = cities.find((c) => c.slug === "chittagong")!.id;

  // 2️⃣ Insert houses
  await db.insert(housesTable).values([
    {
      title: "Modern Flat in Gulshan",
      description: "3 bed apartment near Gulshan Circle",
      price: 12000000,
      bedrooms: 3,
      bathrooms: 2,
      address: "Gulshan 1, Dhaka",
      cityId: dhakaId,
    },
    {
      title: "Luxury Apartment in Banani",
      description: "High-rise apartment with city view",
      price: 18000000,
      bedrooms: 4,
      bathrooms: 3,
      address: "Banani, Dhaka",
      cityId: dhakaId,
    },
    {
      title: "Sea View Flat",
      description: "Beautiful sea-facing apartment",
      price: 9000000,
      bedrooms: 2,
      bathrooms: 2,
      address: "Patenga, Chittagong",
      cityId: chittagongId,
    },
  ]);

  console.log("✅ Seeding completed!");
}

seed()
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });