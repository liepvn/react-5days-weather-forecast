import { emptyAction } from "test/test-utils";

import hcmForecast from 'shared/apis/__fixtures__/weather-api-location-1252431.json';
import sanLocations from 'shared/apis/__fixtures__/weather-api-location-search-san.json';

import { ActionTypes, fetchWeatherForecast, searchLocations } from "../home.action";
import { default as reducer } from "../home.reducer";

describe('home.reducer', () => {
  let home = reducer.home(undefined, {});

  it('should return the initial state', () => {
    expect(reducer.home(home, emptyAction)).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.FETCH_WEATHER_FORECAST_REQUEST}`, () => {
    home = reducer.home(home, fetchWeatherForecast(1212));
    expect(home).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.FETCH_WEATHER_FORECAST_SUCCESS}`, () => {
    home = reducer.home(home, { type: ActionTypes.FETCH_WEATHER_FORECAST_SUCCESS, payload: hcmForecast });
    expect(home).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.SEARCH_LOCATIONS_REQUEST}`, () => {
    home = reducer.home(home, searchLocations('san'));
    expect(home).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.SEARCH_LOCATIONS_SUCCESS}`, () => {
    home = reducer.home(home, { type: ActionTypes.SEARCH_LOCATIONS_SUCCESS, payload: sanLocations });
    expect(home).toMatchSnapshot();
  });
});