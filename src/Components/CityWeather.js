import React from "react"; // This import statement allows access to the React library

export default function CityWeather(props) {
  // Functional Component declaration that takes in props as an argument
  const {
    cityName,
    mainTemp,
    maxTemp,
    minTemp,
    weatherDescription,
    errorMessage,
    iconCode,
    errorFound,
    noResults,
  } = props; // Destructuring props
  const icon = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  if (cityName && errorFound === false) {
    return (
      <div className="container  weatherData">
        <div className="row">
          <div className="col text-center">
            <p className="cityName"> {cityName} </p>
            <img src={icon} alt="" />
          </div>
        </div>

        <div className="row">
          <div className=" col text-center">
            <p className="weatherDescription"> {weatherDescription} </p>
          </div>
        </div>

        <div className="row">
          <div className="col text-center tempContainer">
            <p className="mainTemp">
              {" "}
              {mainTemp} <span className="celcius">o</span>
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col text-right">
            <p className="today"> Today </p>
          </div>
          <div className="col text-center minmax ">
            <p className="maxTemp"> {maxTemp} </p>
            <p className="minTemp"> {minTemp} </p>
          </div>
        </div>
      </div>
    );
  } else if (errorMessage) {
    return (
      <div className="container bg-light noResults">
        <p>{errorMessage}</p>
      </div>
    );
  } else {
    return "";
  }
}
