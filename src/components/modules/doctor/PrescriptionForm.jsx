import { addPriscription } from "@/app/api/list";
import { customAxiosGET, customAxiosPUT } from "@/app/api/methods";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib"; // Import pdf-lib

const PrescriptionForm = ({ consultation }) => {
  console.log({ consultation });
const [doctor,setDoctor]=useState([])
console.log({doctor})
  const getDct = async (id) => {
    try {
      const res = await customAxiosGET("", `v1/doctor/getDoctorsById/${id}`);
      if (res.status) {
        setDoctor(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDct(consultation?.doctorID);
  }, []);

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
        generatePDF(consultation,doctor); // Call PDF generation function
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

  const generatePDF = async (prescriptionData,doctor) => {
    // Create a new PDF document
    console.log({ prescriptionData });
    const pdfDoc = await PDFDocument.create();

    // Add a page of A4 size (595 x 842 points)
    const page = pdfDoc.addPage([595, 842]);

    // Embed a standard font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const {
      medicine,
      careToBeTaken,
      doctorID,
      patientID,
      createdAt,
      patientName,
    } = prescriptionData;

    const {email,name}=doctor;
    const isoString = createdAt;
    const date = new Date(isoString);

    // Example: Convert to a readable date format (e.g., "September 28, 2024")
    const options = { year: "numeric", month: "long", day: "numeric" };
    const readableDate = date.toLocaleDateString("en-US", options);

    // Draw the outer container boxes, titles, and text based on the layout provided in the image
    page.drawText(`Dr. ${name || "Lorem Ipsum"}`, {
      x: 50,
      y: 780,
      size: 12,
      font: timesRomanFont,
    });
    page.drawText(`Email Address: ${email || "Address will go here"}`, {
      x: 50,
      y: 760,
      size: 12,
      font: timesRomanFont,
    });

    // Date (assuming you're receiving it from the form or consultation data)
    page.drawText(`Date: ${readableDate || "Feb 32, 0001"}`, {
      x: 450,
      y: 780,
      size: 12,
      font: timesRomanFont,
    });

    // Care to be taken title and box
    page.drawText("Care to be taken", {
      x: 50,
      y: 710,
      size: 12,
      font: timesRomanFont,
    });

    // Draw a blue-bordered box around the "Care to be taken" section
    page.drawRectangle({
      x: 50,
      y: 650,
      width: 495,
      height: 50,
      borderColor: rgb(0, 0, 1), // Blue color for the border
      borderWidth: 2,
    });
    page.drawText(careToBeTaken || "", {
      x: 60,
      y: 670,
      size: 12,
      font: timesRomanFont,
      maxWidth: 475,
    });

    // Medicines title and box
    page.drawText("Medicine", {
      x: 50,
      y: 610,
      size: 12,
      font: timesRomanFont,
    });

    // Draw a blue-bordered box around the "Medicine" section
    page.drawRectangle({
      x: 50,
      y: 550,
      width: 495,
      height: 50,
      borderColor: rgb(0, 0, 1), // Blue color for the border
      borderWidth: 2,
    });
    page.drawText(medicine || "", {
      x: 60,
      y: 570,
      size: 12,
      font: timesRomanFont,
      maxWidth: 475,
    });

    // Bottom section (doctor's name and signature area) with a blue line
    page.drawLine({
      start: { x: 50, y: 500 },
      end: { x: 545, y: 500 },
      thickness: 2,
      color: rgb(0, 0, 1), // Blue color for the line
    });

    // Draw the blue top border
    page.drawRectangle({
      x: 0,
      y: 815,
      width: 595,
      height: 20,
      color: rgb(0, 0, 1), // Blue color for the top border
    });

    page.drawText(`Name of Doctor: ${name || "Name of doctor"}`, {
      x: 400,
      y: 480,
      size: 12,
      font: timesRomanFont,
    });

    // Save PDF
    const pdfBytes = await pdfDoc.save();

    // Trigger the download
    download(pdfBytes, "prescription.pdf", "application/pdf");
  };

  const download = (data, fileName, mimeType) => {
    const blob = new Blob([data], { type: mimeType });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
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
