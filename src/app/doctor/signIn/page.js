"use client"
import React from 'react';

import { useRouter } from 'next/navigation';
import DynamicForm from '@/components/common/DynamicForm';
import { customAxiosPOST } from '@/app/api/methods';
import { loginDoctor, signUpDoctor } from '@/app/api/list';
import { useSnackbar } from 'notistack';


const doctorSignInData = [
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    validation: { required: true, message: 'Email is required' },
  },
  {
    label: 'Phone Number',
    name: 'phoneNumber',
    type: 'text',
    placeholder: 'Enter your number',
    validation: { required: true, message: 'number is required' },
  }
];

const DoctorSignIn = () => {
  const navigate = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignInSubmit = async(data) => {
    
        try {
          const result = await customAxiosPOST("", loginDoctor, data);
          if (result?.status) {
            enqueueSnackbar("Doctor Sign-up successful!", {
              variant: "success",
            });
            localStorage.setItem("doctorSignUp", JSON.stringify(result?.data));
            navigate.push("/");
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
      <h2 className="text-2xl font-bold mb-4">Doctor Sign-In</h2>
      <DynamicForm formData={doctorSignInData} onSubmit={handleSignInSubmit} />
      <p className="mt-4">
        Don t have an account?{' '}
        <span className="text-blue-500 cursor-pointer" onClick={() => navigate.push('/doctor-signup')}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default DoctorSignIn;
