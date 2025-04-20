const apiKey = 'c88c62df832c70b3c8c4ba968c3c25c8';
const inputC = document.getElementById("countryInput");
const TemperatureE = document.getElementById("Temperature");
const humidityE = document.getElementById("Humidity");
const windspeedE = document.getElementById("windspeed");
const desc = document.getElementById("description");
const airpressureE = document.getElementById("AirPressure");
function getweatherdetails(name, lat, lon, country, state){
let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
fetch(weatherApiUrl).then(res => res.json()).then(data => {
    let temp = (data.main.temp).toFixed(2);
    let humidity = data.main.humidity + "%";
    let airpressure = (data.main.pressure / 33.8639).toFixed(2);
    let windspeed = (data.wind.speed * 3.6).toFixed(2);
    TemperatureE.textContent = temp + "°C";
    humidityE.textContent = humidity;
    windspeedE.textContent = windspeed + "Km/h";
    airpressureE.textContent = airpressure + "inHg";
    desc.textContent = data.weather[0].description;
    console.log(data);
  }).catch(() => {
    alert("no");
})
}
function getcitycords(){
  let cityname = inputC.value.trim();
  inputC.value = '';
  if(!cityname){
    return;
  }
  const apiUrl = `https://restcountries.com/v3.1/name/${cityname}`;
  fetch(apiUrl).then(response => {
    if(!response.ok){
      throw new Error("Country Not Found");
    }
    return response.json();
  }).then(data => {
    const flagurl = data[0].flags.png;
    document.getElementById("result").innerHTML = `
      <img src="${flagurl}" alt="loading">
    `;
  }).catch(error => {
    document.getElementById("result").innerHTML = '<span style="color: red; font-size: 30px;">Country flag not found</span>';
    alert("country Flag Not Found")

  });
  

  let geocodingApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityname)}&limit=1&appid=${apiKey}`;
  fetch(geocodingApiUrl).then(res => res.json()).then(data => {
    let {name, lat, lon, country, state} = data[0];
    getweatherdetails(name, lat, lon, country, state);
  }).catch(() => {
    alert(`failed to fetch cords of ${cityname}`);
  })
}

