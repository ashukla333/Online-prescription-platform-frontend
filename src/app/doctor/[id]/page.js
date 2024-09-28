"use client"
import React, { useState } from "react";


import DoctorProfile from "@/components/modules/doctor/ProfilePage";
import PrescriptionPage from "@/components/modules/doctor/prescriptionPage";
import PrescriptionForm from "@/components/modules/doctor/PrescriptionForm";


// import PrescriptionPage from "./PrescriptionPage";
// import PrescriptionForm from "./PrescriptionForm";

const DoctorDashboard = () => {
  const [currentStep, setCurrentStep] = useState("profile");
  const [selectedConsultation, setSelectedConsultation] = useState(null);
 
  const consultations = [
    {
      id: 1,
      patientName: "Jane Smith",
      currentIllness: "Headache",
      recentSurgery: "None",
    },
    {
      id: 2,
      patientName: "Mark Johnson",
      currentIllness: "Chest Pain",
      recentSurgery: "Appendix Removal",
    },
  ];

  const handleGoToPrescription = () => {
    setCurrentStep("prescription");
  };

  const handleWritePrescription = (consultation) => {
    setSelectedConsultation(consultation);
    setCurrentStep("prescriptionForm");
  };

  const handlePrescriptionSubmit = (data, consultationId) => {
    console.log("Prescription submitted for consultation ID:", consultationId, data);
    // Save the prescription to your database
    setCurrentStep("prescription"); // Navigate back to the prescription page
  };

  return (
    <div>
      {currentStep === "profile" && (
        <DoctorProfile  onGoToPrescription={handleGoToPrescription} />
      )}
      {currentStep === "prescription" && (
        <PrescriptionPage consultations={consultations} onWritePrescription={handleWritePrescription} />
      )}
      {currentStep === "prescriptionForm" && (
        <PrescriptionForm consultation={selectedConsultation} onSubmit={handlePrescriptionSubmit} />
      )}
    </div>
  );
};

export default DoctorDashboard;
