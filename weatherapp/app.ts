import { fetchWeather } from "./api.js";
import { renderWeather, renderError, showLoading } from "./ui.js";

document.getElementById("search")?.addEventListener("click", async () => {
    const input = document.getElementById("city") as HTMLInputElement | null;
    const city = input?.value.trim();

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
