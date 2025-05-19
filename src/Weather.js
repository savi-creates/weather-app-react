import React, { useState } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";

export default function Search() {
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function updateCity(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!city) return;

    setLoading(true);

    let apiKey = "ta4d13o783b04c3ee4a956ed2febde0f";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then((response) => {
      setMessage(`It is ${response.data.temperature.current}ºC in ${city}`);
      setLoading(false);
    });
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
      {loading ? <BeatLoader color="#36d7b7" /> : <p>{message}</p>}
    </div>
  );
}
