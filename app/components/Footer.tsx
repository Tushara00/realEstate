import { client } from "@/sanity/lib/client";
import { footerQuery } from "@/sanity/lib/queries";
import Link from 'next/link';
import Image from 'next/image';
//import { usePathname } from 'next/navigation';
import { FaFacebookF,FaInstagram ,FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
export default async function Footer() {
  const footer = await client.fetch(footerQuery);

  if (!footer) return null;

  return (
    <footer className="border-t p-6 text-sm">
      <h3 className="font-semibold"></h3>

      <ul className="mt-4 space-y-2">
        {footer.links?.map((link: any, index: number) => (
          <li key={index}>
            <a href={link.url} className="hover:underline">
              {link.label}
            </a>
          </li>
        ))}
      </ul>

<div className="bg-[#F7F7F7] text-gray-700 border-t-[1px] border-t-[rgb(235,235,235)] p-4 flex justify-between pt-7 pb-7">
      <ul className='flex space-x-4 [&>li:not(:first-child):hover]:underline
[&>li:not(:first-child):hover]:decoration-offset-4'>
        <li><span>© 2026 Airbnb, Inc.</span></li>
        <li><Link href="/">Privacy</Link></li>
        <li><Link href="/">Terms</Link></li>
        <li><Link href="/">Your privacy Choices</Link></li>
      </ul>
      <ul className= 'flex space-x-4'>
     <li>
    <Link
      href="/"
      aria-label="Facebook"
      className="flex items-center justify-center
                 w-4 h-4 rounded-full
                 bg-black text-white
                 hover:bg-gray-800 transition"
    >
      <FaFacebookF size={14} />
    </Link>
  </li>

  <li>
    <Link
      href="/"
      aria-label="Instagram"
      className="flex items-center justify-center
                 w-4 h-4 rounded-full
                 text-black hover:text-pink-500 transition"
    >
      <FaInstagram size={16} />
    </Link>
  </li>

  <li>
    <Link
      href="/"
      aria-label="Twitter"
      className="flex items-center justify-center
                 w-4 h-4 rounded-full
                 text-black hover:text-blue-500 transition"
    >
      <FaXTwitter size={16} />
    </Link>
  </li>
     
      </ul>
    </div>
    </footer>
  );
}
