
import type { WeatherResponse } from "./types";

export async function fetchWeather(city: string): Promise<WeatherResponse> {
    const API_KEY = "";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`City not found: ${response.status}`);
        }
        const data: WeatherResponse = await response.json();
        return data;
    } catch (err) {
        if (err instanceof Error) {
            throw err;
        }
        throw new Error("An unknown error occurred");
    }

}