import React from "react";
import UploadSection from "./UploadSection";
import { useState } from "react";

import FarmSummary from "./FarmSummary";
import axios from "axios";
import FieldCard from "./FieldCard";

const CropHealthMonitor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [scannedFields, setScannedFields] = useState([]);

  //Call Backend API to get diagnosis
  const handleUploadAndPredict = async () => {
    if (!selectedFile) {
      setError("Please upload an image file.");
      return;
    }
    setLoading(true);
    setError("");

    const form = new FormData();
    form.append("file", selectedFile);

    try {
      const res = await axios.post("http://127.0.0.1:8000/predict", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // expected res.data = { prediction: "Tomato___Leaf_Mold", confidence: 0.93 }
      setDiagnosis(res.data);
      setLoading(false);

      //add to scanned list
      setScannedFields((prev) => [{ id: Date.now(), ...res.data }, ...prev]);

      console.log("CropHealthMonitor: selectedFile =", selectedFile);
      console.log("CropHealthMonitor: diagnosis =", diagnosis);
    } catch (err) {
      console.error(err);
      setError("Failed to get prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen p-6 bg-green-50">
      <h1 className="text-2xl font-bold text-green-700 mb-6">
        Crop Health Monitor
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <UploadSection
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            onPredict={handleUploadAndPredict}
            loading={loading}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        <div className="lg:col-span-2 space-y-6">
          {/* Show latest diagnosis if available */}
          {diagnosis ? (
            <FieldCard file={selectedFile} diagnosis={diagnosis} />
          ) : (
            <div className="bg-white p-6 rounded-xl">
              Upload an image to get diagnosis
            </div>
          )}

          <FarmSummary scanned={scannedFields} />
        </div>
      </div>
    </div>
  );
};

export default CropHealthMonitor;
