import React, { useState } from "react";

const WeatherSearch = () => {
  const [city, setCity] = useState(""); // stores what user types
  const [weather, setWeather] = useState(null); // stores API response
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch weather when user clicks Search
  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      // 1️⃣ Convert city name to lat/lon using geocoding API
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );

      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("City not found. Try again.");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];

      // 2️⃣ Fetch weather using lat/lon
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );

      const weatherData = await weatherRes.json();

      setWeather({
        city: name,
        temperature: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
      });
    } catch (err) {
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center py-10 bg-green-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          🔍 Search Weather by City
        </h2>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        {/* Search Button */}
        <button
          onClick={fetchWeather}
          className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-md font-semibold"
        >
          Search
        </button>

        {/* Loading State */}
        {loading && <p className="mt-4">Loading...</p>}

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Weather Result */}
        {weather && (
          <div className="mt-4 p-4 bg-green-50 rounded">
            <p className="text-lg">
              <strong>City:</strong> {weather.city}
            </p>
            <p className="text-lg">
              <strong>Temperature:</strong> {weather.temperature}°C
            </p>
            <p className="text-lg">
              <strong>Wind Speed:</strong> {weather.windspeed} km/h
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherSearch;
