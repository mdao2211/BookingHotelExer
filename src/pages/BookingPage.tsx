import { ReactNode, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { DayPicker } from "react-day-picker";
import { differenceInDays } from "date-fns";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

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

type Booking = {
  bookingid: number;
  hotelcode: number;
  guestid: number;
  roomno: number;
  bookingdate: Date;
};

// export default function BookingPage() {
//   const { roomId } = useParams<{ roomId: string }>();
//   const navigate = useNavigate();
//   const [selectedRange, setSelectedRange] = useState<{
//     from: Date | undefined;
//     to: Date | undefined;
//   }>({
//     from: undefined,
//     to: undefined,
//   });

//   const { register, handleSubmit } = useForm<BookingForm>();

//   const { data: room, isLoading } = useQuery({
//     queryKey: ["room", roomId],
//     queryFn: async () => {
//       const [room] = await query<Room[]>(
//         "SELECT r.*, h.name as hotel_name FROM rooms r JOIN hotels h ON r.hotel_id = h.id WHERE r.id = ?",
//         [roomId]
//       );
//       return room;
//     },
//   });

//   const createBooking = useMutation({
//     mutationFn: async (data: {
//       roomId: string;
//       checkIn: Date;
//       checkOut: Date;
//       totalPrice: number;
//     }) => {
//       await query(
//         "INSERT INTO bookings (room_id, check_in_date, check_out_date, total_price, status) VALUES (?, ?, ?, ?, ?)",
//         [data.roomId, data.checkIn, data.checkOut, data.totalPrice, "pending"]
//       );
//     },
//     onSuccess: () => {
//       toast.success("Booking confirmed!");
//       navigate("/");
//     },
//     onError: () => {
//       toast.error("Failed to create booking");
//     },
//   });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!room) {
//     return <div>Room not found</div>;
//   }

//   const onSubmit = async (data: BookingForm) => {
//     try {
//       const { from, to } = selectedRange;
//       if (!from || !to) {
//         toast.error("Please select check-in and check-out dates");
//         return;
//       }

//       if (!roomId) {
//         toast.error("Room ID is missing");
//         return;
//       }

//       const nights = differenceInDays(to, from);
//       const totalPrice = nights * room.price_per_night;

//       await createBooking.mutateAsync({
//         roomId,
//         checkIn: from,
//         checkOut: to,
//         totalPrice,
//       });
//     } catch (error) {
//       toast.error("Failed to create booking");
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-2xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8">Book Your Stay</h1>

//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <h2 className="text-2xl font-semibold mb-4">{room.name}</h2>
//           <p className="text-gray-600 mb-2">{room.hotel_name}</p>
//           <p className="text-gray-600 mb-4">${room.price_per_night} / night</p>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Select your dates
//               </label>
//               <DayPicker
//                 mode="range"
//                 selected={selectedRange}
//                 onSelect={(range: any) => setSelectedRange(range)}
//                 className="border rounded-md p-4"
//               />
//             </div>

//             {selectedRange.from && selectedRange.to && (
//               <div className="bg-gray-50 p-4 rounded-md">
//                 <h3 className="font-semibold mb-2">Booking Summary</h3>
//                 <p>Check-in: {selectedRange.from.toLocaleDateString()}</p>
//                 <p>Check-out: {selectedRange.to.toLocaleDateString()}</p>
//                 <p className="mt-2 font-bold">
//                   Total: $
//                   {differenceInDays(selectedRange.to, selectedRange.from) *
//                     room.price_per_night}
//                 </p>
//               </div>
//             )}

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
//               Confirm Booking
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
