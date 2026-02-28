
import { db } from "@/app/admin/db";
import { housesTable } from "@/app/admin/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";

interface Props {
  params: Promise<{slug: string;}>;
}
export default async function SinglePropertyPage({ params }: Props) {
  const { slug } = await params;
console.log(slug)
  // Query DB again 👇
  const house = await db
    .select()
    .from(housesTable)
    .where(eq(housesTable.slug, slug))
    .then((res) => res[0]);

  if (!house) {
    return <div>Property not found</div>;
  }

  return (
    <>

  <div className="container mx-auto px-4 py-8">
  <div className="gallery">
    <div className="items1 relative">
      <Image src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
     alt="img"  fill
    className="object-cover"/>
    </div>

     <div className="items2 relative">
      <Image src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
     alt="img"  fill
    className="object-cover"/>
    </div>
     <div className="items3 relative">
      <Image src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
     alt="img"  fill
    className="object-cover"/>
    </div>
    <div className="items4 relative">
      <Image src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
     alt="img"  fill
    className="object-cover"/>
    </div>
    <div className="items5 relative">
      <Image src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
     alt="img"  fill
    className="object-cover"/>
    </div>
    <div className="items6 relative">
      <Image src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
     alt="img"  fill
    className="object-cover"/>
    </div>
    </div>
</div>

    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold">{house.title}</h1>
      <p className="text-xl mt-4">{house.price}</p>
      <p className="mt-2">{house.description}</p>
    </div>



    <div className="container mx-auto px-4 py-8">

  {/* Gallery Grid */}
  <div className="
    grid
    grid-cols-2
    md:grid-cols-3
    lg:grid-cols-5
    auto-rows-[160px]
    gap-4
  ">

    {/* Big First Image */}
    <div className="
      col-span-2
      row-span-2
      md:col-span-2
      md:row-span-2
      relative
    ">
      <img
        src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
        alt="img"
        className="w-full h-full object-cover rounded-xl"
      />
    </div>

    {/* Other Images */}
    {[1,2,3,4,5].map((item) => (
      <div key={item} className="relative">
        <img
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
          alt="img"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    ))}

  </div>
</div>
    
    </>
    
  );
}

  