// property.query.ts

import { db } from "@/app/admin/db";
import { housesTable, citiesTable } from "@/app/admin/db/schema";
import { and, eq, gte, lte, ilike } from "drizzle-orm";

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


export function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-");        // replace spaces with -
}

export async function getFilteredHouses(filters: {
  q?:string;
  bedrooms?: number;
  minPrice?: number;
  maxPrice?: number;
}) {
  const conditions = [];

  if (filters.bedrooms) {
    conditions.push(eq(housesTable.bedrooms, filters.bedrooms));
  }

  if (filters.minPrice) {
    conditions.push(gte(housesTable.price, filters.minPrice));
  }

  if (filters.maxPrice) {
    conditions.push(lte(housesTable.price, filters.maxPrice));
  }

  const result = await db
    .select()
    .from(housesTable)
    .where(conditions.length ? and(...conditions) : undefined);

  return result;
}