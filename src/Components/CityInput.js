import React from "react";
export default function CityInput(props) {
  const { handleChange, getWeather } = props;
  return (
    <div className="inputContainer">
      <h1>Weather App</h1>
      <p>How is the weather in your city?</p>

      <div className="input">
        <input
          placeholder="Enter a city eg: Pretoria"
          onChange={handleChange}
        />
        <button className="searchBtn " onClick={getWeather}>
          <i className="fa fa-search"></i>
        </button>
      </div>
    </div>
  );
}
