"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FilterFrom(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const [bedrooms, setBedrooms] = useState(
        searchParams.get("bedrooms") || ""
    )

     const [minPrice, setMinPrice] = useState(
        searchParams.get("bedrooms") || ""
    );
     const [maxPrice, setMaxPrice] = useState(
        searchParams.get("bedrooms") || ""
    );

    const handleSubmit =(e:React.FormEvent) =>{
        e.preventDefault();
       const params = new URLSearchParams(searchParams.toString())

       
  if (bedrooms) {
    params.set("bedrooms", bedrooms);
  } else {
    params.delete("bedrooms");
  }

  if (minPrice) {
    params.set("minPrice", minPrice);
  } else {
    params.delete("minPrice");
  }

  if (maxPrice) {
    params.set("maxPrice", maxPrice);
  } else {
    params.delete("maxPrice");
  }

  router.push(`/properties?${params.toString()}`, {
    scroll: false,
  });
};

   

    const handleReset = () => {
  const params = new URLSearchParams(searchParams.toString());

  // Remove filter params
  params.delete("bedrooms");
  params.delete("minPrice");
  params.delete("maxPrice");

  // Reset local state
  setBedrooms("");
  setMinPrice("");
  setMaxPrice("");

  router.push(`/properties?${params.toString()}`, {
    scroll: false,
  });
};

    return(
        <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 bg-gray-100 p-4 rounded-xl">
<input 
type="number"
placeholder="Bedrooms"
value={bedrooms}
onChange={(e) => setBedrooms(e.target.value)}
className="border p-2 rounded"
/>
<input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="border p-2 rounded"
      />
       <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="border p-2 rounded"
      />

      <button
       type="submit"
        className="bg-black text-white px-4 py-2 rounded">
Apply
      </button>
       <button
        type="button"
        onClick={handleReset}
        className="bg-gray-400 text-white px-4 py-2 rounded"
      >
        Reset
      </button>
        </form>
    )
    
}