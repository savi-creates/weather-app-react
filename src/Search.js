import React, { useState } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";

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
      <form
        onSubmit={handleSubmit}
        className="d-flex justify-content-center align-items-center gap-2 mb-4"
      >
        <input
          type="search"
          placeholder="Enter a city..."
          className="form-control"
          onChange={updateCity}
          style={{ maxWidth: "300px" }}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      <div className="text-center my-3">
        {loading && <BeatLoader color="#007BFF" size={20} />}
      </div>
      {error && (
        <div
          className="alert alert-danger text-center"
          style={{ maxWidth: "400px", margin: "0 auto" }}
        >
          {error}
        </div>
      )}

      {weather && (
        <div className="card text-center mx-auto" style={{ maxWidth: "400px" }}>
          <div className="card-body">
            <h2 className="card-title fs-1">{weather.city}</h2>
            <br />
            <p className="card-text">🌡️ Temperature: {weather.temperature}ºC</p>
            <p className="card-text">📝 Description: {weather.description}</p>
            <p className="card-text">💧 Humidity: {weather.humidity}%</p>
            <p className="card-text">🌬️ Wind: {weather.wind} km/h</p>
            <img src={weather.icon} alt={weather.description} />
          </div>
        </div>
      )}
    </div>
  );
}
