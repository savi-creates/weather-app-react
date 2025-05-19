import React, { useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

export default function Search() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateCity(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (city.trim().length === 0) {
      setError("Please enter a city.");
      setWeather(null);
      return;
    }

    setLoading(true);

    const apiKey = "ta4d13o783b04c3ee4a956ed2febde0f";
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch(() => {
        setError("City not found or API error.");
        setWeather(null);
        setLoading(false);
      });
  }

  function handleResponse(response) {
    setError("");
    setWeather({
      city: response.data.city,
      temperature: Math.round(response.data.temperature.current),
      description: response.data.condition.description,
      humidity: response.data.temperature.humidity,
      wind: Math.round(response.data.wind.speed),
      icon: response.data.condition.icon_url,
    });
    setLoading(false);
  }

  return (
    <div className="Search">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Enter a city..."
          onChange={updateCity}
        />
        <input type="submit" value="Search" />
      </form>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        {loading && <ClipLoader color="#007BFF" size={50} />}
      </div>

      {error && <p>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.city}</h2>
          <p>🌡️ Temperature: {weather.temperature}ºC</p>
          <p>📝 Description: {weather.description}</p>
          <p>💧 Humidity: {weather.humidity}%</p>
          <p>🌬️ Wind: {weather.wind} km/h</p>
          <img src={weather.icon} alt={weather.description} />
        </div>
      )}
    </div>
  );
}
