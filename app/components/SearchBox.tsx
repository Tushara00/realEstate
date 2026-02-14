"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { searchAddress } from "@/lib/osm";

type ListingType = "buy" | "rent";
export default function HomeSearch() {
  const router = useRouter();

const [type, setType] = useState<ListingType>("buy");
const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
 function handleSearch(e:React.FormEvent){
  e.preventDefault();
  const params = new URLSearchParams();
  params.set("type", type)
  if(query.trim()){
    params.set("q", query.trim());
  }
  router.push(`/properties?${params.toString()}`)
 }

 async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    if (value.length < 3) {
      setResults([]);
      return;
    }
    setLoading(true);
    const data = await searchAddress(value);
    setResults(data);
    setLoading(false);
  }

  function handleSelect(place: any) {
    setQuery(place.display_name);
    setResults([]);
console.log("LAT:", place.lat);
    console.log("LON:", place.lon);
  }

 

  return (
    <form
      onSubmit={handleSearch}
      className="mx-auto w-full max-w-3xl rounded-xl bg-white p-4 shadow-md"
    >
      {/* Buy / Rent Toggle */}
      <div className="mb-4 flex rounded-lg bg-gray-100 p-1">
        {(["buy", "rent"] as ListingType[]).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setType(value)}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
              type === value
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            {value === "buy" ? "Buy" : "Rent"}
          </button>
        ))}
      </div>

      {/* Autocomplete Search */}
      <div className="relative">
        <input
          value={query}
          onChange={handleChange}
          placeholder="Search city, area, or address"
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
        />

      {loading && <p className="text-sm">Loading...</p>}
       {results.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded-md mt-1">
          {results.map((place) => (
            <li
              key={place.place_id}
              onClick={() => handleSelect(place)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-3 w-full rounded-md bg-black px-4 py-2 text-sm text-white"
      >
        Search
      </button>
    </form>
  );
}
