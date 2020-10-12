import React, { Component } from "react"; // This import statement allows access to the React library
import CityInput from "./Components/CityInput"; // Importing the CityInput component from the Components folder
import CityWeather from "./Components/CityWeather"; // Importing the CityWeather component from the Components folder
import "isomorphic-fetch"; //This statement allows us to use the Fetch API
import "./App.css"; // Importing local stylesheet file
import weather from "./weather.svg"
import rings from "./rings.svg"

class App extends Component {
  //Stateful component declaration
  constructor(props) {
    super(props);
    this.state = {
      query: "", // Setting the state for query to an empty string
      cityName: "", // Setting the state for cityName to an empty string
      weatherDescription: "", // Setting the state for weatherDescription to an empty string
      iconCode: "",
      mainTemperature: 0, // Setting the state for mainTemperature to 0
      maxTemperature: 0, // Setting the state for maxTemperature to 0
      minTemperature: 0, // Setting the state for minTemperature to 0
      errorFound: false, // Setting the state for errorFound to false
      sunrise: "",
    };
  }

  getWeather = () => {
    const { query } = this.state; // Destructuring state
    const API_Key = "ccba6742628f727bcf5543e1cd49b109"; // Declaring a constant for the API key
    const Url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${API_Key}`; // Declaring a constant for the API Url

    // If the state of query is an empty string, alert the user to enter a name of a city
    if (query === "") {
      alert("please enter a name of a  City");
    }
    // else make a Fetch api call with the name of city as the query
    else {
      fetch(Url)
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          this.setState({
            errorFound: false,
          });

          // If the cod property of the fetch result is 200, the fetch was succesfull
          // and the states of cityName, mainTemperature, maxTemperature, minTemperature and
          // weatherDescription are set to the corresponding properties from the fetch result

          if (result.cod === 200) {
            this.setState(
              {
                cityName: result.name,
                mainTemperature: result.main.temp,
                maxTemperature: result.main.temp_max,
                minTemperature: result.main.temp_min,
                weatherDescription: result.weather[0].description,
                iconCode: result.weather[0].icon,
                sunrise: result.sys.sunrise
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

  // This function sets the state of query to the
  // value of the input element
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
      sunrise
    } = this.state; // Destructuring state

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

        <div className="data">
        <CityInput
          handleChange={this.handleChange}
          getWeather={this.getWeather}
        />

        {/*  <div class="spinner-border text-primary" role="status">
         <span class="sr-only">Loading...</span>
       </div> */}
      
         <CityWeather
          cityName={cityName}
          mainTemp={mainTemp}
          maxTemp={maxTemp}
          minTemp={minTemp}
          errorMessage={errorMessage}
          errorFound={errorFound}
          weatherDescription={weatherDescription}
          iconCode={iconCode}
          sunrise = {sunrise}
        />
        </div>
        <div className="hero">
        <img src={weather} alt="" className ="weatherIllustration"/>
        </div>
        
       

        
      

     
       

        <div className="footer">
          <p> &#169; Developed by Omphile Ramadie</p>
        </div>
      </div>
    );
  }
}

export default App;
