import React from "react";

const WeatherSearch = () => {
  return (
    <div className="min-h-screen bg-green-50 p-6">
      {/* Title */}
      <h2 className="text-xl font-semibold text-green-800 mb-2 flex items-center gap-2">
        🌦 Weather Prediction
      </h2>
      <p className="text-gray-600 mb-6">
        7-day forecast and real-time conditions
      </p>

      {/* ------------------------ */}
      {/* 1. CURRENT WEATHER CARD */}
      {/* ------------------------ */}
      <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg mb-8 flex justify-between">
        <div>
          <h1 className="text-5xl font-bold">28°C</h1>
          <p className="text-lg">Partly Cloudy</p>
          <p className="text-sm opacity-80">Feels like 30°C</p>

          <div className="flex gap-6 mt-6 text-sm opacity-90">
            <p>💧 Humidity: 65%</p>
            <p>💨 Wind: 12 km/h</p>
            <p>👁 Visibility: 10 km</p>
            <p>🌡 Pressure: 1013 mb</p>
          </div>
        </div>

        {/* Weather Icon */}
        <div className="flex items-center">
          <div className="bg-blue-400 p-6 rounded-full shadow-xl">☁️</div>
        </div>
      </div>

      {/* ------------------------ */}
      {/* 2. 7-DAY FORECAST */}
      {/* ------------------------ */}
      <h3 className="font-semibold text-green-800 mb-4">7-Day Forecast</h3>

      <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mb-10">
        {/* Example forecast card */}
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <p className="font-semibold">Mon</p>
          <p className="text-3xl">☀️</p>
          <p className="text-xl font-bold">29°</p>
          <p className="text-sm text-gray-500">🌧 10%</p>
        </div>

        {/* Duplicate this 7 times */}
      </div>

      {/* ------------------------ */}
      {/* 3. FARMING RECOMMENDATIONS */}
      {/* ------------------------ */}
      <h3 className="font-semibold text-green-800 mb-2">
        Farming Recommendations
      </h3>

      <div className="space-y-4">
        <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded">
          🌱 Irrigation: Good conditions for morning irrigation.
        </div>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
          ⚠️ Rain Alert: Heavy rain expected mid-week.
        </div>

        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
          🌡 Temperature: Ideal conditions for crop growth.
        </div>
      </div>
    </div>
  );
};

export default WeatherSearch;
