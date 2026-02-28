// property.query.ts

import { db } from "@/app/admin/db";
import { housesTable, citiesTable } from "@/app/admin/db/schema";
import { eq, ilike } from "drizzle-orm";

export async function getHousesByCitySlug(slug?: string) {
  return db
    .select({
      id: housesTable.id,
      title: housesTable.title,
      price: housesTable.price,
      city: citiesTable.name,
    })
    .from(housesTable)
    .leftJoin(citiesTable, eq(housesTable.cityId, citiesTable.id))
    .where(slug ? eq(citiesTable.slug, slug) : undefined);
}
