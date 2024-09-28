"use client";
import React from "react";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/common/DynamicForm";
import { signUpDoctor } from "@/app/api/list";
import { customAxiosPOST } from "@/app/api/methods";
import { useSnackbar } from "notistack";


const doctorSignUpData = [
  {
    label: "Profile Picture",
    name: "profilePicture",
    type: "file",
    validation: { required: true, message: "Profile picture is required" },
  },
  {
    label: "Full Name",
    name: "name",
    type: "text",
    placeholder: "Enter your full name",
    validation: { required: true, message: "Name is required" },
  },
  {
    label: "Specialty",
    name: "specialty",
    type: "text",
    placeholder: "Enter your specialty",
    validation: { required: true, message: "Specialty is required" },
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    validation: { required: true, message: "Email is required" },
  },
  {
    label: "Phone Number",
    name: "phone",
    type: "tel",
    placeholder: "Enter your phone number",
    validation: { required: true, message: "Phone number is required" },
  },
  {
    label: "Years of Experience",
    name: "experience",
    type: "number",
    step: "0.1",
    placeholder: "Enter years of experience (Eg: 1.5)",
    validation: { required: true, message: "Experience is required" },
  },
];

const DoctorSignUp = () => {
  const navigate = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const handleSignUpSubmit = async (data) => {
    try {
    console.log({data})
      const result = await customAxiosPOST("", signUpDoctor, data);

      if (result?.status) {
        enqueueSnackbar("Doctor Sign-up successful!", {
          variant: "success",
        });

        navigate.push("/doctor-signIn");
      } else {
        enqueueSnackbar("Sign-up failed. Please try again.", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong during sign-up", {
        variant: "warning",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 !text-black shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Doctor Sign-Up</h2>
      <DynamicForm formData={doctorSignUpData} onSubmit={handleSignUpSubmit} />
      <p className="mt-4">
        Already have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate.push("/doctor/signIn")}
        >
          Sign In
        </span>
      </p>
    </div>
  );
};

export default DoctorSignUp;
