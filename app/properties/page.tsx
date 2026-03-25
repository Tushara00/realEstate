import { db } from "@/app/admin/db/index";
import { housesTable, citiesTable } from "../admin/db/schema";
import { eq, ilike, or,lte,and,gte } from "drizzle-orm";
import PropertyCard from "../admin/components/property/PropertyCard";
import FilterForm from "../admin/components/property/FilterForm";
import { getFilteredHouses } from "../admin/db/property.queries";

function getSlugCandidates(query?: string) {
  if (!query) return [];

  return query
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);
}

async function queryFromDb(filters:{
    q?: string;
  bedrooms?: number;
  minPrice?: number;
  maxPrice?: number;
}){
   const { q, bedrooms, minPrice, maxPrice } = filters;

     const candidates = getSlugCandidates(q);
  const conditions = [];

  const query = db
  .select({
      id: housesTable.id,
      title: housesTable.title,
      price: housesTable.price,
      slug: housesTable.slug,
      bedrooms: housesTable.bedrooms,
      city: citiesTable.name,
    })
    .from(housesTable)
    .leftJoin(
      citiesTable,
      eq(housesTable.cityId, citiesTable.id)
    );

  // City filter
  if (candidates.length > 0) {
    conditions.push(
      or(
        ...candidates.map((s) =>
          ilike(citiesTable.slug, `%${s}%`)
        )
      )
    );
  }
// Bedroom filter
  if (bedrooms !== undefined) {
    conditions.push(eq(housesTable.bedrooms, bedrooms));
  }

  // Price filter
  if (minPrice !== undefined) {
    conditions.push(gte(housesTable.price, minPrice));
  }

  if (maxPrice !== undefined) {
    conditions.push(lte(housesTable.price, maxPrice));
  }
    if (conditions.length > 0) {
    query.where(and(...conditions));
  }

  return await query;
}

/* -----------------------------
Page Props
------------------------------*/
interface Props { 
  searchParams: Promise<{ q?: string;
    bedrooms?: number;
  minPrice?: number;
  maxPrice?: number;
   }>; }

/* -----------------------------
Page Component
------------------------------*/
export default async function PropertiesPage({
  searchParams,
}: Props) {
  
  const params = await searchParams;
 

  const properties = await queryFromDb({
    q:params?.q,
    bedrooms:params?.bedrooms?Number(params.bedrooms):undefined,
     minPrice: params?.minPrice
      ? Number(params.minPrice)
      : undefined,
    maxPrice: params?.maxPrice
      ? Number(params.maxPrice)
      : undefined,
  });
 

  return (
    <div className="container mx-auto px-4 py-8">
      <FilterForm />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((house) => (
          <PropertyCard
            key={house.id}
            id={house.id}
            title={house.title}
            price={house.price}
            city={house.city}
          slug={house.slug}
          bedrooms={house.bedrooms}
          />
        ))}
      </div>
    </div>
  );
}


export  async function PropertiesPage2({
  searchParams,
}: Props) {
  
  const params = await searchParams;

const {  bedrooms, minPrice, maxPrice,q } = params;
  
  const properties2 = await queryFromDb({bedrooms})

  return (
    <div className="container mx-auto px-4 py-8">
      <FilterForm />
      

       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {properties2.map((house) => (
          <PropertyCard
            key={house.id}
            id={house.id}
            title={house.title}
            price={house.price}
            city={house.city}
          slug={house.slug}
          bedrooms={house.bedrooms}
          />
        ))}
      </div>
    </div>
  );
}



