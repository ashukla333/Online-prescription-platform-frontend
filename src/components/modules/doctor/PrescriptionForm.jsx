import React from 'react';
import { useForm } from 'react-hook-form';

const PrescriptionForm = ({ consultation }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Handle prescription submission (e.g., send data to the server)
    console.log('Prescription submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white text-black p-6 rounded shadow-md">
      <h3 className="text-xl font-semibold mb-4">Write Prescription for {consultation.patientName}</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Care to be Taken (mandatory):
        </label>
        <textarea 
          {...register('care', { required: 'Care to be taken is mandatory!' })} 
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        {errors.care && <p className="text-red-500 text-sm">{errors.care.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Medicines:
        </label>
        <textarea 
          {...register('medicines')} 
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Submit Prescription
      </button>
    </form>
  );
};

export default PrescriptionForm;
