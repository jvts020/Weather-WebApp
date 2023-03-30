// variaveis e elementos    
const apiKey = "";
const apiCountryURL = `https://www.countryflagicons.com/FLAT/64/`;
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector ("#city-input");
const searchBtn = document.querySelector ("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");

//funções
const getWeatherData = async(city) => {

     const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

     const res = await fetch(apiWeatherURL);
     const data = await res.json();

     return data

};

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  countryElement.setAttribute("src", apiCountryURL + data.sys.country);
  countryElement.setAttribute("src", `https://www.countryflagicons.com/FLAT/64/${data.sys.country}.png` );
  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;


  //Mudar imagem de fundo


  document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

  weatherContainer.classList.remove("hide");
};
    
//eventos
searchBtn.addEventListener("click", (e) => {
     e.preventDefault();

     const city = cityInput.value;

     showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
if (e.code === "Enter") {	
  const city = e.target.value;

  showWeatherData(city);
}
});


// Tratamento de erro

function showErrorMessage() {
  errorMessageContainer.classList.remove("hide");
}

const hideInformation = () => {
  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");

  suggestionContainer.classList.add("hide");
};


