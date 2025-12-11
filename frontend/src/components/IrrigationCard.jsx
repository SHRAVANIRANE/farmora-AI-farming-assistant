import React, { useState, useEffect, use } from "react";

const IrrigationCard = ({ onBackToHome }) => {
  const [schedule, setSchedule] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/scheduler")
      .then((res) => res.json())
      .then((data) => {
        setSchedule(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading schedule...</p>;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white shadow-xl rounded-xl p-8 w-96 text-center border border-green-100">
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          🌾 Irrigation Schedule
        </h2>

        <p className="text-gray-700">
          <strong>Field:</strong> {schedule.Field}
        </p>
        <p className="text-gray-700">
          <strong>💧 Water Needed:</strong> {schedule.water_needed_liters} L
        </p>
        <p className="text-gray-700">
          <strong>⏱️ Duration:</strong> {schedule.duration_minutes} min
        </p>

        <p className="text-green-700 mt-3 font-medium">{schedule.message}</p>

        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md"
          >
            🔄 Recalculate
          </button>
          <button
            onClick={onBackToHome}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg shadow-md"
          >
            ⬅ Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default IrrigationCard;
