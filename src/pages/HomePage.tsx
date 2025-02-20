import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Hotel = {
  hotelcode: string;
  hotelname: string;
  address: string;
  postcode: number;
  city: string;
  country: string;
  numrooms: string;
  phoneno: number;
  starrating: number;
  image_url: string;
};

const fetchHotels = async (): Promise<Hotel[]> => {
  const response = await fetch("http://localhost:5000/hotels");
  const data = await response.json();
  return data;
};

export default function HomePage() {
  const [showData, setShowData] = useState(false);

  // Fetch all hotels
  const {
    data: hotels,
    isLoading,
    error,
  } = useQuery<Hotel[]>({
    queryKey: ["hotels"],
    queryFn: fetchHotels,
  });

  // Simulate loading time (3s delay)
  useEffect(() => {
    const timer = setTimeout(() => setShowData(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Handle loading state
  if (isLoading || !showData) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="animate-pulse flex flex-col items-center gap-4 w-60">
          <div>
            <div className="w-48 h-6 bg-slate-400 rounded-md"></div>
            <div className="w-28 h-4 bg-slate-400 mx-auto mt-3 rounded-md"></div>
          </div>
          <div className="h-7 bg-slate-400 w-full rounded-md"></div>
          <div className="h-7 bg-slate-400 w-full rounded-md"></div>
          <div className="h-7 bg-slate-400 w-full rounded-md"></div>
          <div className="h-7 bg-slate-400 w-1/2 rounded-md"></div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error instanceof Error) {
    return <div>Error loading hotels: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Featured Hotels</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels?.map((hotel) => (
          <Link
            key={hotel.hotelcode}
            to={`/hotels/${hotel.hotelcode}`}
            className="block group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-105">
              <img
                src={hotel.image_url}
                alt={hotel.hotelname}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {hotel.hotelname}
                </h2>
                <p className="text-gray-600 mb-2">
                  {hotel.city}, {hotel.country}
                </p>
                <div className="flex items-center">
                  <span className="text-yellow-400">
                    {"★".repeat(hotel.starrating)}
                  </span>
                  <span className="text-gray-400">
                    {"★".repeat(5 - hotel.starrating)}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
