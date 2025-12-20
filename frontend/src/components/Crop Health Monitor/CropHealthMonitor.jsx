import { useEffect, useState } from "react";
import axios from "axios";

import UploadSection from "./UploadSection";
import FieldCard from "./FieldCard";
import FarmSummary from "./FarmSummary";

const CropHealthMonitor = () => {
  // ---------------- STATE ----------------
  const [selectedFile, setSelectedFile] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [scannedFields, setScannedFields] = useState([]);

  const [overallHealth, setOverallHealth] = useState(null);
  const [healthyCount, setHealthyCount] = useState(0);
  const [needAttentionCount, setNeedAttentionCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------- FETCH SUMMARY (ON PAGE LOAD) ----------------
  const fetchCropSummary = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/crop-health/summary");
      const data = await res.json();

      setOverallHealth(data.healthy_percentage);
      setHealthyCount(data.total_fields - data.diseased_fields);
      setNeedAttentionCount(data.diseased_fields);
    } catch (err) {
      console.error("Summary fetch error:", err);
    }
  };

  useEffect(() => {
    fetchCropSummary();
  }, []);

  // ---------------- IMAGE UPLOAD & PREDICTION ----------------
  const handleUploadAndPredict = async () => {
    if (!selectedFile) {
      setError("Please upload an image file.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axios.post("http://127.0.0.1:8000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setDiagnosis(res.data);

      // Add scan to local list (UI only)
      setScannedFields((prev) => [{ id: Date.now(), ...res.data }, ...prev]);

      // 🔄 Re-fetch backend summary (REAL DATA)
      fetchCropSummary();
    } catch (err) {
      console.error(err);
      setError("Failed to get prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen p-6 bg-green-50">
      <h1 className="text-2xl font-bold text-green-700 mb-6">
        Crop Health Monitor
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* UPLOAD SECTION */}
        <div className="lg:col-span-1">
          <UploadSection
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            onPredict={handleUploadAndPredict}
            loading={loading}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {/* RESULT + HISTORY */}
        <div className="lg:col-span-2 space-y-6">
          {diagnosis ? (
            <FieldCard
              file={selectedFile}
              diagnosis={diagnosis}
              overallHealth={overallHealth}
              healthyCount={healthyCount}
              needAttentionCount={needAttentionCount}
            />
          ) : (
            <div className="bg-white p-6 rounded-xl shadow">
              Upload an image to get crop diagnosis
            </div>
          )}

          <FarmSummary />
        </div>
      </div>
    </div>
  );
};

export default CropHealthMonitor;
