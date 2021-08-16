import { all, call, put, takeLatest } from 'redux-saga/effects';
import weatherApi from 'shared/apis/weather.api';

import { ActionTypes } from './home.action';

/**
 * Handle fetching weather forecast data
 */
export function* fetchWeatherForecast({ payload }) {
  const { woeid } = payload || {};

  try {
    const { data } = yield call(weatherApi.fetchForecastByLocation, woeid);

    yield put({
      type: ActionTypes.FETCH_WEATHER_FORECAST_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: ActionTypes.FETCH_WEATHER_FORECAST_FAILURE,
      payload: error
    });
  }
}

/**
 * Handle search locations
 */
export function* searchLocations({ payload: { query }}) {
  try {
    const { data } = yield call(weatherApi.searchLocations, query);

    yield put({
      type: ActionTypes.SEARCH_LOCATIONS_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: ActionTypes.SEARCH_LOCATIONS_FAILURE,
      payload: error
    });
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.FETCH_WEATHER_FORECAST_REQUEST, fetchWeatherForecast),
    takeLatest(ActionTypes.SEARCH_LOCATIONS_REQUEST, searchLocations)
  ]);
}
