import React, { useState, useMemo } from "react";
import axios from "axios";
import FarmGrid from "./FarmGrid";

// --- Define Your Costs ---
const COST_PER_PLOT_SPRAY = 10;
const COST_BLANKET_SPRAY = 250;

const createInitialGrid = () => {
  const cells = [];
  for (let i = 1; i <= 25; i++) {
    cells.push({ id: i, status: "healthy" });
  }
  return cells;
};

// This component receives 'onBackToHome' as a prop from App.jsx
function Simulator({ onBackToHome }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [gridData, setGridData] = useState(createInitialGrid());
  const [selectedCell, setSelectedCell] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPrediction(null);
    setError(null);
  };

  const handleCellClick = (cellId) => {
    setSelectedCell(cellId);
    setSelectedFile(null);
    setPrediction(null);
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedCell) {
      setError("Please select a cell and an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // NOTE: Make sure your backend server is running!
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const newPrediction = response.data;
      setPrediction(newPrediction);

      const isHealthy = newPrediction.prediction.includes("healthy");

      setGridData((prevGrid) =>
        prevGrid.map((cell) =>
          cell.id === selectedCell
            ? { ...cell, status: isHealthy ? "healthy" : "infected" }
            : cell
        )
      );
    } catch (err) {
      console.error(err);
      setError("Failed to get prediction. Is the backend server running?");
    }
  };

  // Cost Savings Report Calculation
  const summary = useMemo(() => {
    const infectedCount = gridData.filter(
      (cell) => cell.status === "infected"
    ).length;
    const healthyCount = gridData.filter(
      (cell) => cell.status === "healthy"
    ).length;

    const precisionCost = infectedCount * COST_PER_PLOT_SPRAY;
    const totalSavings = COST_BLANKET_SPRAY - precisionCost;

    return {
      healthy: healthyCount,
      infected: infectedCount,
      precisionCost: precisionCost,
      totalSavings: totalSavings,
    };
  }, [gridData]);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-8">
      <header className="max-w-7xl mx-auto">
        <button
          onClick={onBackToHome}
          className="absolute top-4 left-4 text-green-700 font-medium hover:underline"
        >
          &larr; Back to Home
        </button>
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700">
            🌱 Krishi Mitra
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            Smart Crop Disease Detection Simulator
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-10 mt-10">
          {/* Grid Container */}
          <div className="p-6 bg-white rounded-lg shadow-xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Virtual Farm Map
            </h3>
            <FarmGrid
              gridData={gridData}
              onCellClick={handleCellClick}
              selectedCell={selectedCell}
            />
          </div>

          {/* Controls & Report Container */}
          <div className="flex flex-col gap-6">
            {/* Controller */}
            <div className="p-6 bg-white rounded-lg shadow-xl w-full max-w-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Inspection Area
              </h3>
              {!selectedCell && (
                <p className="text-red-600 font-medium">
                  Please click a plot on the grid to inspect.
                </p>
              )}

              {selectedCell && (
                <>
                  <p className="text-lg mb-4">
                    Inspecting plot:{" "}
                    <span className="font-bold text-blue-600 text-2xl">
                      {selectedCell}
                    </span>
                  </p>

                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500
                               file:mr-4 file:py-2 file:px-4
                               file:rounded-full file:border-0
                               file:text-sm file:font-semibold
                               file:bg-green-50 file:text-green-700
                               hover:file:bg-green-100 cursor-pointer"
                  />
                  <button
                    onClick={handleUpload}
                    disabled={!selectedFile}
                    className="w-full mt-4 px-4 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 disabled:bg-gray-400 transition"
                  >
                    Run Diagnosis
                  </button>

                  {error && (
                    <p className="text-red-600 font-medium mt-4">{error}</p>
                  )}

                  {prediction && (
                    <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
                      <h4 className="font-bold text-lg text-gray-800">
                        Diagnosis Result:
                      </h4>
                      <p className="text-gray-700 text-lg">
                        <strong>Disease:</strong> {prediction.prediction}
                      </p>
                      <p className="text-gray-700 text-lg">
                        <strong>Confidence:</strong>{" "}
                        {(prediction.confidence * 100).toFixed(2)}%
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Report Container */}
            <div className="p-6 bg-white rounded-lg shadow-xl w-full max-w-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Farm Summary Report
              </h3>
              <p className="text-lg">
                Healthy Plots:{" "}
                <span className="font-bold text-green-600">
                  {summary.healthy}
                </span>
              </p>
              <p className="text-lg">
                Infected Plots:{" "}
                <span className="font-bold text-red-600">
                  {summary.infected}
                </span>
              </p>

              <h4 className="text-xl font-semibold text-gray-700 mt-4 pt-4 border-t">
                Cost Analysis
              </h4>
              <p className="text-gray-600">
                Traditional (Blanket) Spray:{" "}
                <span className="font-medium line-through">
                  ${COST_BLANKET_SPRAY}
                </span>
              </p>
              <p className="text-gray-600">
                Precision Spray (Your Tool):{" "}
                <span className="font-medium text-green-600">
                  ${summary.precisionCost}
                </span>
              </p>
              <p className="text-xl font-bold text-green-700 mt-2">
                Total Savings: ${summary.totalSavings}
              </p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Simulator;
