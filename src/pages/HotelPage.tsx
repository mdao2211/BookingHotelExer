import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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

type Room = {
  roomno: string;
  roomtype: string;
  hotelcode: number;
  occupancy: string;
};

const fetchHotel = async (id: string): Promise<Hotel> => {
  const response = await fetch(`http://localhost:5000/hotels/${id}`);
  const data = await response.json();
  return data;
};

const fetchRooms = async (id: string): Promise<Room[]> => {
  const response = await fetch(`http://localhost:5000/rooms/${id}`);
  const data = await response.json();
  return data;
};

export default function HotelPage() {
  const { id } = useParams<{ id: string }>();
  const [showData, setShowData] = useState(false);

  const { data: hotel, isLoading: isLoadingHotel } = useQuery<Hotel>({
    queryKey: ["hotel", id],
    queryFn: () => (id ? fetchHotel(id) : Promise.reject("No ID provided")),
    enabled: !!id,
  });

  const { data: rooms, isLoading: isLoadingRooms } = useQuery<Room[]>({
    queryKey: ["rooms", id],
    queryFn: () => (id ? fetchRooms(id) : Promise.reject("No ID provided")),
    enabled: !!id,
  });

  // Simulate loading time (3s delay)
  useEffect(() => {
    const timer = setTimeout(() => setShowData(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoadingHotel || !showData) {
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
  } else if (!hotel) {
    return <div className="text-center py-8">Hotel not found</div>;
  }
  if (isLoadingRooms || !showData) {
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
  } else if (!rooms || rooms.length === 0) {
    return <div className="text-center py-8">No rooms available</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hotel Section */}
      <div className="mb-12 bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={hotel.image_url}
          alt={hotel.hotelname}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <div className="p-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            {hotel.hotelname}
          </h1>
          <p className="text-lg text-gray-600 mt-2">{hotel.address}</p>
          <p className="text-lg text-gray-600">
            {hotel.city}, {hotel.country}
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Hotel Code: {hotel.hotelcode}
          </p>
          <div className="flex items-center mt-4">
            <span className="text-yellow-500">
              {"★".repeat(hotel.starrating)}
            </span>
            <span className="text-gray-400">
              {"★".repeat(5 - hotel.starrating)}
            </span>
          </div>
        </div>
      </div>

      {/* Rooms Section */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Available Rooms
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms?.map((room) => (
          <div
            key={room.roomno}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:scale-105 hover:shadow-xl duration-300">
            <img
              src="https://dq5r178u4t83b.cloudfront.net/wp-content/uploads/sites/125/2020/06/15182916/Sofitel-Dubai-Wafi-Luxury-Room-Bedroom-Skyline-View-Image1_WEB.jpg"
              alt={room.roomtype}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Number: {room.roomtype}
              </h3>
              <p className="text-gray-600 mt-2">Room No: {room.roomno}</p>
              <p className="text-gray-600 mt-2">Occupancy: {room.occupancy}</p>
              <p className="text-gray-600 mt-2">Hotel Code: {room.hotelcode}</p>

              <button className="text-white bg-sky-700 hover:bg-red-500 p-2 ml-52 rounded-md ">
                <Link rel="stylesheet" to={`/`}>
                  Booking Now
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
