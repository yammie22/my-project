function search(city) {

  
    let URL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=b2a5adcct04b33178913oc335f405433&units=metric`;
  
    axios
      .get(URL)
      .then(displayWeatherCondition)
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }

  function handleSearch(event){
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");

    search(searchInputElement.value);
    
    

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

    let humidElement = document.querySelector("#humidity");
    humidElement.innerHTML = response.data.temperature.humidity + "%";

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = response.data.wind.speed + "km/h";

    let iconElement = document.querySelector("#icon");
    iconElement.innerHTML =  `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;

  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  let currentDateElement = document.querySelector("#current-date");
  let currentDate = new Date();
  currentDateElement.innerHTML = formatDate(currentDate);

  function displayForecast() {
    let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastHtml = "";
  
    days.forEach(function (day) {
      forecastHtml =
        forecastHtml +
        `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${day}</div>
          <div class="weather-forecast-icon">🌤️</div>
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>15º</strong>
            </div>
            <div class="weather-forecast-temperature">9º</div>
          </div>
        </div>
      `;
    });
  
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
  }

  
  search("paris");
  displayForecast();

