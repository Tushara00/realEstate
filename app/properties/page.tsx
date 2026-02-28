import { db } from "@/app/admin/db/index";
import { housesTable, citiesTable } from "../admin/db/schema";
import { eq, ilike, or } from "drizzle-orm";
import PropertyCard from "../admin/components/property/PropertyCard";
import { generateSlug } from "../admin/lib/utils";

/* -----------------------------
Extract slug candidates
------------------------------*/
function getSlugCandidates(query?: string) {
  if (!query) return [];

  return query
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);
}

/* -----------------------------
Database Query Function
------------------------------*/
async function queryFromDb(slug?: string) {
  const candidates = getSlugCandidates(slug);

  const query = db
    .select({
      id: housesTable.id,
      title: housesTable.title,
      price: housesTable.price,
    slug: housesTable.slug,
      city: citiesTable.name,
    })
    .from(housesTable)
    .leftJoin(
      citiesTable,
      eq(housesTable.cityId, citiesTable.id)
    );

  if (candidates.length > 0) {
    query.where(
      or(
        ...candidates.map((s) =>
          ilike(citiesTable.slug, `%${s}%`)
        )
      )
    );
  }

  return await query;
}

/* -----------------------------
Page Props
------------------------------*/
interface Props { 
  searchParams: Promise<{ q?: string; }>; }

/* -----------------------------
Page Component
------------------------------*/
export default async function PropertiesPage({
  searchParams,
}: Props) {
  
  const params = await searchParams;
    const slug = params?.q;

  const properties = await queryFromDb(slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((house) => (
          <PropertyCard
            key={house.id}
            id={house.id}
            title={house.title}
            price={house.price}
            city={house.city}
          slug={house.slug}
          />
        ))}
      </div>
    </div>
  );
}



