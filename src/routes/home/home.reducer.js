import { createReducer } from 'core/helpers';
import { take } from 'lodash';

import { ActionTypes } from './home.action';
import { WEATHER_STATE_IMAGE_BASE_URL } from './home.constant';

/**
 * Initial state
 */
export const homeState = {
  data: undefined,
  isSearching: false,
  isLoading: false,
  locations: [],
  forecast: []
};

/**
 * Reducer
 */
const homeReducer = createReducer(
  {
    [ActionTypes.FETCH_WEATHER_FORECAST_REQUEST]: (draft) => {
      draft.isLoading = true
    },
    [ActionTypes.FETCH_WEATHER_FORECAST_SUCCESS]: (draft, { payload }) => {
      const { consolidated_weather } = payload;

      draft.forecast = take(consolidated_weather, 5).map(
        ({ max_temp, min_temp, applicable_date, weather_state_abbr, humidity, the_temp }) => ({
          maxTemp: max_temp,
          minTemp: min_temp,
          date: applicable_date,
          weatherStateAbbr: weather_state_abbr,
          weatherStateImage: `${WEATHER_STATE_IMAGE_BASE_URL}/${weather_state_abbr}.png`,
          humidity,
          temp: the_temp
        })
      );
      draft.isLoading = false
    },
    [ActionTypes.FETCH_WEATHER_FORECAST_FAILURE]: (draft) => {
      draft.isLoading = false
    },
    [ActionTypes.SEARCH_LOCATIONS_REQUEST]: (draft) => {
      draft.isSearching = true
    },
    [ActionTypes.SEARCH_LOCATIONS_SUCCESS]: (draft, { payload }) => {
      draft.isSearching = false
      draft.locations = payload
    },
    [ActionTypes.SEARCH_LOCATIONS_FAILURE]: (draft) => {
      draft.isSearching = false
    },
  },
  homeState
);

const reducer = {
  home: homeReducer
}

export default reducer;
