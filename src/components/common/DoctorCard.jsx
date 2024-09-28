import React from "react";
import { Button } from "@material-tailwind/react";
import Image from "next/image"; 
import { useRouter } from "next/navigation";

const DoctorCard = ({ doctor }) => {
  const router = useRouter();

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-2xl bg-white p-6">
      <div className="relative">
        <Image
          src={doctor.profilePicture}
          alt={`${doctor.name}'s Profile`}
          width={500}
          height={500}
          onError={(event) => {
            event.target.src = "/images/demo.jpg"; // Fallback image
            event.error = null;
          }}
          onClick={() => {
            router.push(`/doctor/${doctor._id}`);
          }}
          className="rounded-full cursor-pointer w-32 h-32 mx-auto border-4 border-green-400 shadow-md transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-2 text-black text-xs font-semibold">
          {doctor.specialty || "specialty"}
        </div>
      </div>
      <div className="text-center mt-4">
        <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>
      </div>
      <div className="mt-6">
        <Button
          onClick={() => {
            router.push(`/doctor/doctor-consultation/${doctor?._id}`);
          }}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-2 transition duration-200 shadow hover:shadow-lg"
        >
          Consult
        </Button>
      </div>
    </div>
  );
};

export default DoctorCard;
