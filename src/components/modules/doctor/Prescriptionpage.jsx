import React, { useEffect, useState } from "react";
import PrescriptionForm from "./PrescriptionForm";
import { useParams } from "next/navigation";
import { customAxiosGET } from "@/app/api/methods";
import { getConsultationByDrId } from "@/app/api/list";

const PrescriptionPage = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const handleConsultationClick = (consultation) => {
    setSelectedConsultation(consultation);
  };

  const router = useParams();

  const getAllDocterData = async (id) => {
    try {
      const result = await customAxiosGET("", getConsultationByDrId(id));
      if (result.status) {
        setConsultations(result.data?.length > 0 ? result.data : []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router.id) {
      getAllDocterData(router.id);
    }
  }, [router.id]);

  console.log({ consultations });

  return (
    <div className="mx-auto my-4 p-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-black">
        {consultations.length === 0 ? (
          <p className="text-center text-black">
            No consultations available
          </p>
        ) : (
          "Consultations"
        )}
      </h2>
      {loading ? (
        "Loading..."
      ) : (
        <ul className="list-none px-20 !text-black space-y-4">
          {consultations.length > 0 &&
            consultations.map((consultation) => (
              <li
                key={consultation._id}
                onClick={() => handleConsultationClick(consultation)}
                className="cursor-pointer hover:bg-blue-100 transition duration-200 p-4 rounded-lg border border-gray-300 bg-white shadow-lg transform hover:scale-105"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold !text-black text-lg">
                      {consultation.patientData?.name}
                    </span>
                    <span className="text-gray-500 text-sm block">
                      {new Date(consultation.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="text-gray-600 text-sm bg-blue-200 px-2 py-1 rounded-full">
                    {consultation.status || "Pending"}
                  </span>
                </div>
                <p className="mt-2 text-gray-600 text-sm">
                  Click to view details and write a prescription
                </p>
              </li>
            ))}
        </ul>
      )}

      {selectedConsultation && (
        <div className="mt-6 p-4 border border-gray-300 rounded bg-white shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            Write Prescription for {selectedConsultation.patientData?.name}
          </h3>
          <PrescriptionForm consultation={selectedConsultation} />
        </div>
      )}
    </div>
  );
};

export default PrescriptionPage;
