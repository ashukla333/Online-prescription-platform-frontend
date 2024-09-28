"use client"
import DynamicForm from "@/components/common/DynamicForm";
import React, { useState } from "react";

const PatientSignUpForm = () => {
  const [patientData, setPatientData] = useState([]);
  

  const formData = [
    {
      label: "Profile Picture",
      name: "profilePicture",
      type: "file",
      validation: { required: { value: true, message: "Profile picture is required" } },
    },
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter your name",
      validation: { required: { value: true, message: "Name is required" } },
    },
    {
      label: "Age",
      name: "age",
      type: "number",
      placeholder: "Enter your age",
      validation: { required: { value: true, message: "Age is required" }, min: 1 },
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      validation: {
        required: { value: true, message: "Email is required" },
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Invalid email address",
        },
      },
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      type: "tel",
      placeholder: "Enter your phone number",
      validation: {
        required: { value: true, message: "Phone number is required" },
        pattern: {
          value: /^[0-9]{10}$/,
          message: "Invalid phone number",
        },
      },
    },
    {
      label: "History of Surgery",
      name: "historyOfSurgery",
      type: "text",
      placeholder: "Separate multiple surgeries by commas",
    },
    {
      label: "History of Illness",
      name: "historyOfIllness",
      type: "text",
      placeholder: "Separate multiple illnesses by commas",
    },
  ];

  const handleSubmit = (data) => {
    // Format the input data into JSON
    const formattedData = {
      profilePicture: data.profilePicture[0]?.name, // Name of the uploaded file
      name: data.name,
      age: data.age,
      email: data.email,
      phoneNumber: data.phoneNumber,
      historyOfSurgery: data.historyOfSurgery ? data.historyOfSurgery.split(",").map(item => item.trim()) : [],
      historyOfIllness: data.historyOfIllness ? data.historyOfIllness.split(",").map(item => item.trim()) : [],
    };

    setPatientData((prev) => [...prev, formattedData]); // Add new patient data to the list
    console.log(formattedData); // Log formatted data to console

    
  };

  return (
    <div className="w-full max-w-lg mx-auto !text-black my-10">
      <h2 className="text-2xl font-bold text-center mb-5">Patient Sign-Up</h2>
      <DynamicForm formData={formData} onSubmit={handleSubmit} />

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Patient Data</h3>
        <div className="bg-gray-100 p-4 rounded shadow-md">
          {patientData.length === 0 ? (
            <p>No patient data available.</p>
          ) : (
            patientData.map((patient, index) => (
              <div key={index} className="mb-4 border-b">
                <p><strong>Name:</strong> {patient.name}</p>
                <p><strong>Age:</strong> {patient.age}</p>
                <p><strong>Email:</strong> {patient.email}</p>
                <p><strong>Phone Number:</strong> {patient.phoneNumber}</p>
                <p><strong>Profile Picture:</strong> {patient.profilePicture}</p>
                <p><strong>History of Surgery:</strong> {patient.historyOfSurgery.join(", ")}</p>
                <p><strong>History of Illness:</strong> {patient.historyOfIllness.join(", ")}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientSignUpForm;
