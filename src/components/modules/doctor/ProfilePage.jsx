"use client";

import React, { useEffect, useState } from "react";
import { Button, Typography, Card, CardBody, CardFooter } from "@material-tailwind/react";
import Image from "next/image";
import { customAxiosGET } from "@/app/api/methods";
import { getDocterByID } from "@/app/api/list";
import { useParams } from "next/navigation";

const DoctorProfile = ({ onGoToPrescription }) => {
  const router = useParams();
  const [doctor, setDoctor] = useState({});

  const getAllDocterData = async (id) => {
    try {
      const result = await customAxiosGET("", getDocterByID(id));
      if (result.status) {
        setDoctor(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router?.id) {
      getAllDocterData(router?.id);
    }
  }, [router?.id]);

  return (
    <Card className="max-w-md mx-auto mt-10 shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <Image
        src={doctor.profilePicture || "/images/demo.jpg"}
        height={500}
        width={500}
        alt={doctor.name}
        className="w-full h-52 object-cover rounded-t-lg"
        onError={(event) => {
          event.target.src = "/images/demo.jpg";
          event.error = null;
        }}
      />
      <CardBody className="p-5">
        <Typography variant="h4" className="font-bold text-gray-900">
          {doctor.name || "Doctor Name"}
        </Typography>
        <Typography className="text-gray-600 mt-2">
          {doctor.specialty || "Specialty"}
        </Typography>
        <Typography className="text-gray-500 mt-1">
          {doctor.email}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-between items-center p-5 border-t">
        <Button onClick={onGoToPrescription} className="bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300">
          Go to Prescription Page
        </Button>
        <Typography variant="small" className="text-gray-500">
          
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default DoctorProfile;
