"use client"
import { customAxiosPOST } from "@/app/api/methods";
import DynamicForm from "@/components/common/DynamicForm";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useState } from "react";

const PatientSignUpForm = () => {
 
  const router=useRouter()
  const { enqueueSnackbar } = useSnackbar();
  const formData = [
    {
      label: "Profile Picture",
      name: "avatar",
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



  const handleSubmit = async (data) => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", data.name);
    formDataToSend.append("age", data.age);
    formDataToSend.append("email", data.email);
    formDataToSend.append("phoneNumber", data.phoneNumber);
    formDataToSend.append("avatar", data.avatar); 
    formDataToSend.append(
      "historyOfSurgery",
      data.historyOfSurgery ? data.historyOfSurgery.split(",").map((item) => item.trim()) : []
    );
    formDataToSend.append(
      "historyOfIllness",
      data.historyOfIllness ? data.historyOfIllness.split(",").map((item) => item.trim()) : []
    );

    try {
      const result = await customAxiosPOST("","/v1/patient/createPatient", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (result?.status) {
        enqueueSnackbar("Patient Sign-up successful!", { variant: "success" });
        router.push(`/`);
        localStorage.setItem("patient", JSON.stringify(result?.data));
      } else {
        enqueueSnackbar("Sign-up failed. Please try again.", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong during sign-up", { variant: "warning" });
    }
  };
  return (
    <div className="w-full max-w-lg mx-auto !text-black my-10">
      <h2 className="text-2xl font-bold text-center mb-5">Patient Sign-Up</h2>
      <DynamicForm formData={formData} onSubmit={handleSubmit} />

    </div>
  );
};

export default PatientSignUpForm;
