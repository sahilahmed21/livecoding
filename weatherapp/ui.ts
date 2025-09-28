import type { WeatherResponse } from "./types";

export function renderError(msg: string): void {
  const weatherEl = document.getElementById("weather");
  if (weatherEl) {
    weatherEl.innerHTML = `<p style="color:red">${msg}</p>`;
  }
}

export function renderWeather(data: WeatherResponse): void {
  const weatherDiv = document.getElementById("weather");
  if (!weatherDiv) return;

  weatherDiv.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>Temperature: ${data.main.temp} °C</p>
    <p>Weather: ${data.weather[0].description}</p>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
  `;
}

export function showLoading(): void {
  const weatherEl = document.getElementById("weather");
  if (weatherEl) {
    weatherEl.innerHTML = "<p>Loading...</p>";
  }
}
