"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Step 1: Current Illness & Recent Surgery",
    fields: [
      {
        name: "currentIllness",
        label: "Current Illness History",
        type: "text",
        required: true,
      },
      {
        name: "recentSurgery",
        label: "Recent Surgery (Time Span)",
        type: "text",
        required: true,
      },
    ],
  },
  {
    title: "Step 2: Family Medical History",
    fields: [
      {
        name: "familyHistory",
        label: "Diabetics",
        type: "radio",
        options: [
          { value: "Diabetic", label: "Diabetic" },
          { value: "Non-Diabetic", label: "Non-Diabetic" },
        ],
        required: true,
      },
      {
        name: "allergies",
        label: "Any Allergies",
        type: "text",
      },
      {
        name: "others",
        label: "Others",
        type: "text",
      },
    ],
  },
];

const ConsultationForm = () => {
  const [step, setStep] = useState(0);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log(data);


    alert("Consultation details submitted successfully!");
  };

  const handleNextStep = () => {
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-md mx-auto my-10 !text-black flex-col space-y-4"
    >
      {steps.map((stepData, index) => (
        index === step && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
           
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold">{stepData.title}</h2>
            {stepData.fields.map((field) => (
              <div key={field.name}>
                <label className="block font-semibold pt-5">{field.label}</label>
                {field.type === "text" && (
                  <input
                    type="text"
                    {...register(field.name, { required: field.required && `${field.label} is required` })}
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                )}
                {field.type === "radio" && (
                  <div className="flex items-center">
                    {field.options.map((option) => (
                      <label key={option.value} className="mr-4">
                        <input
                          type="radio"
                          value={option.value}
                          {...register(field.name, { required: field.required && 'This field is required' })}
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                )}
                {errors[field.name] && (
                  <p className="text-red-500">{errors[field.name].message}</p>
                )}
              </div>
            ))}
            <div className="flex justify-between mt-4">
              {step > 0 && (
                <Button type="button" onClick={handlePrevStep} className="bg-gray-500 text-white">
                  Back
                </Button>
              )}
              {step < steps.length - 1 ? (
                <Button type="button" onClick={handleNextStep} className="bg-blue-500 text-white">
                  Next
                </Button>
              ) : (
                <Button type="submit" className="bg-green-500 text-white">
                  Submit
                </Button>
              )}
            </div>
          </motion.div>
        )
      ))}
    </form>
  );
};

export default ConsultationForm;
