function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let cityElement = document.querySelector("#current-city");
    let query = searchInputElement.value;
  
    let URL = `https://api.shecodes.io/weather/v1/current?query=${query}&key=b2a5adcct04b33178913oc335f405433&units=metric`;
  
    axios
      .get(URL)
      .then(displayWeatherCondition)
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }
  
  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }
  
  function displayWeatherCondition(response) {
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.city;
  
    let temp = Math.round(response.data.temperature.current);
    let currentTemp = document.querySelector(".current-temperature-value");
    currentTemp.innerHTML = temp;
    let descrsiptionElement = document.querySelector("#description");
    descrsiptionElement.innerHTML = response.data.condition.description;

  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  let currentDateElement = document.querySelector("#current-date");
  let currentDate = new Date();
  currentDateElement.innerHTML = formatDate(currentDate);
  