import React, { useEffect, useState } from "react";
import PrescriptionForm from "./PrescriptionForm";
import { useParams } from "next/navigation";
import { customAxiosGET } from "@/app/api/methods";
import { getConsultationByDrId } from "@/app/api/list";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib"; // Import pdf-lib for PDF generation

const PrescriptionPage = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const handleConsultationClick = (consultation) => {
    setSelectedConsultation(consultation);
  };

  const router = useParams();

  const getAllDocterData = async (id) => {
    try {
      const result = await customAxiosGET("", getConsultationByDrId(id));
      if (result.status) {
        setConsultations(result.data?.length > 0 ? result.data : []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router.id) {
      getAllDocterData(router.id);
    }
  }, [router.id]);


  

  const generatePDF = async (consultation) => {
    const { medicine, careToBeTaken, doctorID, createdAt, patientData } =
      consultation;

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);

    // Embed font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // Format date
    const date = new Date(createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Draw the text and sections (similar to the previous generatePDF function)
    page.drawText(`Dr. ${doctorID}`, {
      x: 50,
      y: 780,
      size: 12,
      font: timesRomanFont,
    });
    page.drawText(`Date: ${date}`, {
      x: 450,
      y: 780,
      size: 12,
      font: timesRomanFont,
    });

    // Care to be taken section
    page.drawText("Care to be Taken:", {
      x: 50,
      y: 710,
      size: 12,
      font: timesRomanFont,
    });
    page.drawRectangle({
      x: 50,
      y: 650,
      width: 495,
      height: 50,
      borderColor: rgb(0, 0, 1),
      borderWidth: 2,
    });
    page.drawText(careToBeTaken || "", {
      x: 60,
      y: 670,
      size: 12,
      font: timesRomanFont,
      maxWidth: 475,
    });

    // Medicines section
    page.drawText("Medicines:", {
      x: 50,
      y: 610,
      size: 12,
      font: timesRomanFont,
    });
    page.drawRectangle({
      x: 50,
      y: 550,
      width: 495,
      height: 50,
      borderColor: rgb(0, 0, 1),
      borderWidth: 2,
    });
    page.drawText(medicine || "", {
      x: 60,
      y: 570,
      size: 12,
      font: timesRomanFont,
      maxWidth: 475,
    });

    // Download the PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Prescription_${patientData.name}.pdf`;
    link.click();
  };

  return (
    <div className="mx-auto my-4 p-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-black">
        {consultations.length === 0 ? (
          <p className="text-center text-black">No consultations available</p>
        ) : (
          "Consultations"
        )}
      </h2>
      {loading ? (
        "Loading..."
      ) : (
        <ul className="list-none px-20 !text-black space-y-4">
          {consultations.length > 0 &&
            consultations.map((consultation) => (
              <li
                key={consultation._id}
                className="cursor-pointer hover:bg-blue-100 transition duration-200 p-4 rounded-lg border border-gray-300 bg-white shadow-lg transform hover:scale-105 flex justify-between"
              >
                <div onClick={() => handleConsultationClick(consultation)}>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold !text-black text-lg">
                        {consultation.patientData?.name}
                      </span>
                      <span className="text-gray-500 text-sm block">
                        {new Date(consultation.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-gray-600 text-sm bg-blue-200 px-2 py-1 rounded-full">
                      {consultation.status || "Pending"}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600 text-sm">
                    Click to view details and write a prescription
                  </p>
                </div>

                {/* Add Download PDF Button */}
                <button
                  onClick={() => generatePDF(consultation)}
                  className="bg-green-500 text-white px-3 py-2 rounded-md shadow-sm hover:bg-green-600 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                >
                  <span className="flex items-center justify-center space-x-1">
                    <svg
                      className="w-4 h-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 5-9-5-9 5V5a2 2 0 012-2h12a2 2 0 012 2v14z"
                      />
                    </svg>
                    <span>PdF Download</span>
                  </span>
                </button>
              </li>
            ))}
        </ul>
      )}

      {selectedConsultation && (
        <div className="mt-6 p-4 border border-gray-300 rounded bg-white shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            Write Prescription for {selectedConsultation.patientData?.name}
          </h3>
          <PrescriptionForm consultation={selectedConsultation} />
        </div>
      )}
    </div>
  );
};

export default PrescriptionPage;
