
import Image from "next/image";
import HomeSearch from "./components/SearchBox";

export const revalidate = 3600;

export default function Home() {


  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold">
          Find your next home
        </h1>

        <p className="text-gray-600">
          Buy or rent properties in your preferred location
        </p>

        <HomeSearch />
     
      </div>
    </main>
  );


}
