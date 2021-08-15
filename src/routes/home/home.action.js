import { createAction } from "core/helpers";

export const ActionTypes = {
  FETCH_WEATHER_FORECAST_REQUEST: 'FETCH_WEATHER_FORECAST_REQUEST',
  FETCH_WEATHER_FORECAST_SUCCESS: 'FETCH_WEATHER_FORECAST_SUCCESS',
  FETCH_WEATHER_FORECAST_FAILURE: 'FETCH_WEATHER_FORECAST_FAILURE',
  SEARCH_LOCATIONS_REQUEST: 'SEARCH_LOCATIONS_REQUEST',
  SEARCH_LOCATIONS_SUCCESS: 'SEARCH_LOCATIONS_SUCCESS',
  SEARCH_LOCATIONS_FAILURE: 'SEARCH_LOCATIONS_FAILURE',
}

export const fetchWeatherForecast = createAction(ActionTypes.FETCH_WEATHER_FORECAST_REQUEST, ({ woeid }) => ({ woeid }));
export const searchLocations = createAction(ActionTypes.SEARCH_LOCATIONS_REQUEST, (query) => ({ query }));