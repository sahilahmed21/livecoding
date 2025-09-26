export function renderError(msg) {
    document.getElementById("weather").innerHTML = `<p style="color:red">${msg}</p>`;
}

export function renderWeather(data) {
    const weatherDiv = document.getElementById("weather");

    weatherDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>Temperature: ${data.main.temp} °C</p>
      <p>Weather: ${data.weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
    `;
}
