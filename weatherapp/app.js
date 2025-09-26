import { fetchWeather } from "./api.js";
import { renderWeather, renderError, showLoading } from "./ui.js";

document.getElementById("search").addEventListener("click", async () => {
    const city = document.getElementById("city").value.trim();

    if (!city) {
        renderError("Please enter a city name.");
        return;
    }

    showLoading();

    try {
        const data = await fetchWeather(city);
        renderWeather(data);
    } catch (error) {
        renderError(error.message);
    }
});
