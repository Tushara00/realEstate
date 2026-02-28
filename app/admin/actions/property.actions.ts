// actions/properties.action.ts
import { getHousesByCitySlug } from "@/app/admin/db/property.queries";

export async function fetchProperties(searchParams: { city?: string }) {
  let citySlug: string | undefined;

  if (searchParams.city) {
    // Convert city name to slug (matches schema.slug)
    citySlug = searchParams.city
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-"); // spaces become hyphens
  }

  const houses = await getHousesByCitySlug(citySlug);

  return houses;
}

