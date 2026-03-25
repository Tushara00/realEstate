import Image from 'next/image'
import { FaShare ,FaRegHeart} from "react-icons/fa";
import Link from 'next/link';
import { generateSlug } from '../../lib/utils';
interface PropertyCardProps{
  id:number;
  title: string;
  price: number;
  city?:string | null;
  imageUrl?:string;
  slug?:string;
  bedrooms?:string;

}
export default function PropertyCard({title,price,city,imageUrl,id,slug,bedrooms}:PropertyCardProps) {
  return (
    <>
    <div className="min-h-screen w-full p-6">
        <div className=''>
          <Link href={`/properties/${slug}`}>
         <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
          <div className="relative w-full h-56">
  <Image
    src={ imageUrl || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"}
    alt={title}
    fill
    className="object-cover"
  />
</div>
        <div className="p-5">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600 mb-3">{bedrooms}</p>
          <p className="text-lg font-bold text-indigo-600">{price}</p>
          <p>{city}</p>
        </div>
      </div>
      </Link>
        </div>
    </div>

    </>
  )
}
