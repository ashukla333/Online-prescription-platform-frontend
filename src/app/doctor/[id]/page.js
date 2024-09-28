"use client";
import React, { useEffect, useState } from "react";
import DoctorProfile from "@/components/modules/doctor/ProfilePage";
import PrescriptionForm from "@/components/modules/doctor/PrescriptionForm";
import PrescriptionPage from "@/components/modules/doctor/PrescriptionPage";

const DoctorDashboard = () => {
  const [currentStep, setCurrentStep] = useState("profile");
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const handleGoToPrescription = () => {
    setCurrentStep("prescription");
  };

  const handleWritePrescription = (consultation) => {
    setSelectedConsultation(consultation);
    setCurrentStep("prescriptionForm");
  };

  const handlePrescriptionSubmit = (data, consultationId) => {
    console.log(
      "Prescription submitted for consultation ID:",
      consultationId,
      data
    );
    setCurrentStep("prescription");
  };

  return (
    <div>
      {currentStep === "profile" && (
        <DoctorProfile onGoToPrescription={handleGoToPrescription} />
      )}
      {currentStep === "prescription" && (
        <PrescriptionPage onWritePrescription={handleWritePrescription} />
      )}
      {currentStep === "prescriptionForm" && (
        <PrescriptionForm
          consultation={selectedConsultation}
          onSubmit={handlePrescriptionSubmit}
        />
      )}
    </div>
  );
};

export default DoctorDashboard;
