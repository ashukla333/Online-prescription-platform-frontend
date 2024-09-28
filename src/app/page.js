"use client";
import DoctorCard from "@/components/common/DoctorCard";
import { customAxiosGET } from "./api/methods";
import { getAllDocter } from "./api/list";
import { useEffect, useState } from "react";
import Loader from "@/components/common/loader";

export default function Home() {
  const [doctors, setDoctor] = useState([]);
  const [loading, setLoading] = useState(true);
  const getAllDocterData = async () => {
    try {
      const result = await customAxiosGET("", getAllDocter);
      if (result.status) {
        console.log(result);
        setDoctor(result.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDocterData();
  }, []);

  return (
    <div className="h-screen bg-white">
      {loading ? ( 
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-5">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
}
