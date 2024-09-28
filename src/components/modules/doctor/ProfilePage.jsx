"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
;
import { customAxiosGET } from "@/app/api/methods";
import { getDocterByID } from "@/app/api/list";
import { useParams } from "next/navigation";

const DoctorProfile = ({  onGoToPrescription }) => {
    const router=useParams()
    console.log({router})
    const [doctors,setDoctor]=useState([])
    const getAllDocterData = async (id) => {
      try {
        const result = await customAxiosGET("", getDocterByID(id));
        if (result.status) {
          console.log(result);
          setDoctor(result.data)
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
        if(router?.id){
            getAllDocterData(router?.id);
        }
    }, [router?.id]);
  
  console.log(doctors)
  
  return (
    <div className="max-w-md mx-auto !text-black my-10 border rounded-lg shadow-lg p-5">
      <Image
        src={doctors.profileImage}
        height={500}
        onError={(event) => {
            event.target.src = "/images/demo.jpg";
            event.error = null;
          }}
        width={500}
        alt={doctors.name}
        
        className="w-full h-48 object-cover rounded-lg"
      />
      <h2 className="text-xl font-semibold mt-4">{doctors.name}</h2>
      <p className="text-gray-600">{doctors.specialty || "-"}</p>
      <Button
        onClick={onGoToPrescription}
        className="bg-blue-500 text-white mt-4"
      >
        Go to Prescription Page
      </Button>
    </div>
  );
};

export default DoctorProfile;
