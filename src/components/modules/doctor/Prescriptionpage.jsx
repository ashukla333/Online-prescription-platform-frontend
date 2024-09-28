import React, { useState } from "react";
import PrescriptionForm from "./PrescriptionForm";

const PrescriptionPage = ({ consultations }) => {
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const handleConsultationClick = (consultation) => {
    setSelectedConsultation(consultation);
  };

  return (
    <div className="  mx-auto my-4 p-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-black">
        Consultations
      </h2>
      <ul className="list-none px-20 !text-black space-y-4">
        {consultations.map((consultation) => (
          <li
            key={consultation.id}
            onClick={() => handleConsultationClick(consultation)}
            className="cursor-pointer hover:bg-blue-100 transition duration-200 p-4 rounded-lg border border-gray-300 bg-white shadow-lg transform hover:scale-105"
          >
            <div className="flex justify-between  items-center">
              <div>
                <span className="font-semibold  !text-black text-lg">
                  {consultation.patientName}
                </span>
                <span className="text-gray-500 text-sm block">
                  {consultation.date}
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

      {selectedConsultation && (
        <div className="mt-6 p-4 border border-gray-300 rounded bg-white shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            Write Prescription for {selectedConsultation.patientName}
          </h3>
          <PrescriptionForm consultation={selectedConsultation} />
        </div>
      )}
    </div>
  );
};

export default PrescriptionPage;
