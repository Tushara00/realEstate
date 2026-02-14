// lib/osm.ts
export async function searchAddress(query: string) {
  if (!query) return [];

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?` +
      new URLSearchParams({
        q: query,
        format: "json",
        addressdetails: "1",
        limit: "5",
        countrycodes: "bd",
      }),
    {
      headers: {
        "User-Agent": "your-app-name", // IMPORTANT
      },
    }
  );

  return res.json();
}
