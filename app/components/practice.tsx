"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import usePlacesAutocomplete from "use-places-autocomplete";
type ListingType = "buy" | "rent";

export default function HomeSearch() {
  const router = useRouter();

  const [type, setType] = useState<ListingType>("buy");
  const [query, setQuery] = useState("");

 function handleSearch(e:React.FormEvent){
  e.preventDefault();
  const params = new URLSearchParams();
  params.set("type", type)
  if(query.trim()){
    params.set("q", query.trim());
  }
  router.push(`/properties?${params.toString()}`)
 }

  return (
  <form  onSubmit={handleSearch}
      className="mx-auto w-full max-w-3xl rounded-xl bg-white p-4 shadow-md">
   <div className="mb-4 flex rounded-lg bg-gray-100 p-1">
    {(["buy", "rent"] as ListingType[]).map((value) =>(
      <button
      key={value}
      type="button"
      onClick={()=>setType(value)}
      className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
        type === value
        ? "bg-black text-white"
        : "text-gray-600 hover:bg-gray-200"
      }`}>
{value === "buy" ?"Buy" :"Rent"}
      </button>
    ))}
   </div>
   {/*search*/}
         <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
          <input
           type="text"
          placeholder="Search by city, area, or property name"
          value={query}
          onChange ={(e) =>setQuery(e.target.value)}
           className="w-full border-none outline-none text-sm"
          />
            <button
          type="submit"
          className="rounded-md bg-black px-4 py-2 text-sm text-white"
        >
          Search
        </button>
         </div>
    </form>
  );
}

