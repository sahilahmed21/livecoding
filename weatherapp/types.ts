export interface WeatherResponse {
    name: string;
    sys: { country: string };
    main: { temp: number }
    weather: { description: string; icon: string }
}