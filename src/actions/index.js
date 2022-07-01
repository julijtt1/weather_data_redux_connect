import transformForecast from "../services/transformForecast";
import transformWeather from "../services/transformWeather";

export const SET_FORECAST_DATA = "SET_FORECAST_DATA";
export const SET_CITY = "SET_CITY";

export const GET_WEATHER_CITY = "GET_WEATHER_CITY";
export const SET_WEATHER_CITY = "SET_WEATHER_CITY";

const setForecastData = (payload) => ({ type: SET_FORECAST_DATA, payload });
const setCity = (payload) => ({ type: SET_CITY, payload });

const getWeatherCity = (payload) => ({ type: GET_WEATHER_CITY, payload });
const setWeatherCity = (payload) => ({ type: SET_WEATHER_CITY, payload });

const api_key = "f99bbd9e4959b513e9bd0d7f7356b38d";
const url = "http://api.openweathermap.org/data/2.5/forecast";
const urlWeather = "http://api.openweathermap.org/data/2.5/weather";

export const setSelectedCity = (payload) => {
  return (dispatch) => {
    const url_forecast = `${url}?q=${payload}&appid=${api_key}`;

    dispatch(setCity(payload));

    return fetch(url_forecast)
      .then((data) => data.json())
      .then((weather_data) => {
        const forecastData = transformForecast(weather_data);
        console.log(forecastData);

        dispatch(setForecastData({ city: payload, forecastData }));
      });
  };
};

export const setWeather = (payload) => {
  return (dispatch) => {
    payload.forEach((city) => {
      dispatch(getWeatherCity(city));

      const api_weather = `${urlWeather}?q=${city}&appid=${api_key}`;
      fetch(api_weather)
        .then((data) => {
          return data.json();
        })
        .then((weather_data) => {
          const weather = transformWeather(weather_data);

          dispatch(setWeatherCity({ city, weather }));
        });
    });
  };
};
