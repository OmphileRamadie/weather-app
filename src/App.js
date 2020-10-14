import React, { Component } from "react";
import CityInput from "./Components/CityInput";
import CityWeather from "./Components/CityWeather";
import "isomorphic-fetch";
import "./App.css";
import weather from "./weather.svg";
import noResults from "./noResults.svg";
require("dotenv").config();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "Pretoria",
      cityName: "",
      weatherDescription: "",
      iconCode: "",
      mainTemperature: 0,
      maxTemperature: 0,
      minTemperature: 0,
      errorFound: false,
      sunrise: "",
    };
  }

  getWeather = () => {
    const { query } = this.state;
    const API_Key = process.env.REACT_APP_API_KEY;
    const Url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${API_Key}`;

    if (query === "") {
      alert("please enter a name of a  City");
    } else {
      fetch(Url)
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          this.setState({
            errorFound: false,
          });

          if (result.cod === 200) {
            this.setState(
              {
                cityName: result.name,
                mainTemperature: result.main.temp,
                maxTemperature: result.main.temp_max,
                minTemperature: result.main.temp_min,
                weatherDescription: result.weather[0].description,
                iconCode: result.weather[0].icon,
                sunrise: result.sys.sunrise,
              },
              () => console.log(this.state.iconCode)
            );
          } else {
            this.setState({
              errorMessage: result.message,
              errorFound: true,
            });
          }
        });
    }
  };

  handleChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  };

  componentDidMount() {
    const { query } = this.state;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const Url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${API_KEY}`;
    console.log(process.env);

    fetch(Url)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.setState({
          errorFound: false,
        });

        if (result.cod === 200) {
          this.setState(
            {
              cityName: result.name,
              mainTemperature: result.main.temp,
              maxTemperature: result.main.temp_max,
              minTemperature: result.main.temp_min,
              weatherDescription: result.weather[0].description,
              iconCode: result.weather[0].icon,
              sunrise: result.sys.sunrise,
            },
            () => console.log(this.state.iconCode)
          );
        } else {
          this.setState({
            errorMessage: result.message,
            errorFound: true,
          });
        }
      });
  }

  handleChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  };

  render() {
    const {
      cityName,
      mainTemperature,
      maxTemperature,
      minTemperature,
      weatherDescription,
      errorMessage,
      errorFound,
      iconCode,
      sunrise,
    } = this.state;

    let date = new Date();

    var mainTemp = mainTemperature - 273; // Converting the main temperature from kelvin to celcius
    mainTemp = parseInt(mainTemp); // Parsing main temp into an integer
    var maxTemp = maxTemperature - 273; // Converting the max temperature from kelvin to celcius
    maxTemp = parseInt(maxTemp); // Parsing max temp into an integer
    var minTemp = minTemperature - 273; // Converting the min temperature from kelvin to celcius
    minTemp = parseInt(minTemp); // Parsing min temp into an integer

    return (
      <div className="App shadow pt-4">
        <div className="header">
          <h6>The Weather App</h6>
          <p>{date.toDateString()}</p>
        </div>

        <div className="weatherInfo">
          <CityInput
            handleChange={this.handleChange}
            getWeather={this.getWeather}
          />

          <CityWeather
            cityName={cityName}
            mainTemp={mainTemp}
            maxTemp={maxTemp}
            minTemp={minTemp}
            errorMessage={errorMessage}
            errorFound={errorFound}
            weatherDescription={weatherDescription}
            iconCode={iconCode}
            sunrise={sunrise}
            noResults={noResults}
          />
        </div>
        <div className="hero">
          <img src={weather} alt="" className="weatherIllustration" />
        </div>

        <div className="footer">
          <p> &#169; Developed by Omphile Ramadie</p>
        </div>
      </div>
    );
  }
}

export default App;
