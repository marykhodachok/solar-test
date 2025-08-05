// openweather api
const weatherKey = "8d6cc0740f87e2604a4fb22c82e5ca4a";
let selectedData = {
    weatherId: null,
    lat: null,
    lon: null
};

// dadata Suggestion
const input = document.getElementById("address");
Dadata.createSuggestions(input, {
  token: "961a3da7a6e0a6f8f0caa60b587154bd97eeca57",
  type: "address",
  hint: false,
  params: {
    from_bound: { value: "city" },
    to_bound: { value: "city" },
    locations: [{ city_type_full: "город" }],
  },
  beforeFormat,
  formatSelected,
  onSelect(suggestion) {
    selectedData.lat = suggestion.data.geo_lat;
    selectedData.lon = suggestion.data.geo_lon;
    selectedData.weatherId = suggestion.data.weatherId
  },
});

function beforeFormat(suggestion) {
  const newValue = suggestion.data.city;
  suggestion.value = newValue;
  return suggestion;
}

function formatSelected(suggestion) {
  return suggestion.data.city;
}

function getWeather() {
    
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${selectedData.lat}&lon=${selectedData.lon}&appid=${weatherKey}&units=metric&lang=ru`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Данные не получены: + ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      document.getElementById("weather").style = 'display: block;';
      document.getElementById("main-temperature").innerText = Math.round(data.main.temp);
      document.getElementById("feelslike").innerText = Math.round(data.main.feels_like);
      document.getElementById("humidity").innerText = data.main.humidity;
      document.getElementById("visibility").innerText = data.visibility / 1000;
      document.getElementById("speed").innerText = Math.round(data.wind.speed);
      document.getElementById("pressure").innerText = data.main.pressure;
      document.getElementById("weather-city").innerText = data.name;
      document.getElementById("weatherIcon").className = getWeatherIconClass(selectedData.weatherId);
    });
}

function getCurrentLocation() {
    if (!navigator.geolocation) {
      console.error("Геолокация не поддерживается вашим браузером");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        selectedData.lat = position.coords.latitude;
        selectedData.lon = position.coords.longitude;
        getWeather();
      },
      (error) => {
        console.error("Ошибка геолокации:", error);
      }
    );
  }

  function getWeatherIconClass(weatherId) {
    if (weatherId >= 200 && weatherId < 300) return "fas fa-bolt";
    if (weatherId >= 300 && weatherId < 400) return "fas fa-cloud-rain";
    if (weatherId >= 500 && weatherId < 600) return "fas fa-cloud-showers-heavy";
    if (weatherId >= 600 && weatherId < 700) return "fas fa-snowflake";
    if (weatherId >= 700 && weatherId < 800) return "fas fa-smog";
    if (weatherId === 800) return "fas fa-sun";
    if (weatherId >= 801 && weatherId < 900) return "fas fa-cloud";
    return "fas fa-cloud";
  }

