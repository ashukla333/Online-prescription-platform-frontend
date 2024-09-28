import React, { useState } from "react";
import { useForm } from "react-hook-form";

const DynamicForm = ({ formData, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [file, setFile] = useState(null); 
console.log({file})
  const handleFileChange = (event) => {
    setFile(event.target.files[0]); 
  };

  const onFormSubmit = (data) => {
    if (file) {
      data.profilePicture = file; 
      console.log({data})
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      {formData.map((field, index) => (
        <div key={index} className="mb-4">
          <label className="block font-semibold mb-2">
            {field.label}
          </label>
          {field.type === "file" ? (
            <input
              type={field.type}
              name={field.name}
              accept="image/*"
              onChange={handleFileChange} 
              className="border p-2 w-full"
            />
          ) : (
            <input
              type={field.type}
              {...register(field.name, {
                required: field.validation?.required && field.validation?.message,
              })}
              placeholder={field.placeholder}
              className="border p-2 w-full"
            />
          )}
          {errors[field.name] && (
            <span className="text-red-500">
              {errors[field.name].message}
            </span>
          )}
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;
