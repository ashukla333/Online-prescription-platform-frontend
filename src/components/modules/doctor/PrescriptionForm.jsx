import { addPriscription } from "@/app/api/list";
import { customAxiosPUT } from "@/app/api/methods";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";

const PrescriptionForm = ({ consultation }) => {
  console.log({ consultation });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors },
  } = useForm({
    defaultValues: {
      medicines: consultation.medicine || "",
      care: consultation.careToBeTaken || "", 
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data) => {
    console.log("Prescription submitted:", data);
    try {
      let obj = {
        medicine: data?.medicines,
        careToBeTaken: data?.care,
        doctorID: consultation?.doctorID,
        patientID: consultation?.patientID,
        culsultantId: consultation?._id,
      };
      const result = await customAxiosPUT("", addPriscription, obj);

      if (result?.status) {
        enqueueSnackbar("Prescription submitted", {
          variant: "success",
        });
        reset(); 
        router.push("/");
      } else {
        enqueueSnackbar("Prescription not submitted", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong", {
        variant: "warning",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white text-black p-6 rounded shadow-md"
    >
      <h3 className="text-xl font-semibold mb-4">
        Write Prescription for {consultation.patientName}
      </h3>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Care to be Taken (mandatory):
        </label>
        <textarea
          {...register("care", { required: "Care to be taken is mandatory!" })}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        {errors.care && (
          <p className="text-red-500 text-sm">{errors.care.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Medicines:</label>
        <textarea
          {...register("medicines")}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 transition duration-200"
      >
        Submit Prescription
      </button>
    </form>
  );
};

export default PrescriptionForm;
