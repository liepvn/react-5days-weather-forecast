import { expectSaga } from 'redux-saga-test-plan';

import home, { fetchWeatherForecast, searchLocations } from 'routes/home/home.saga';
import sanLocations from 'shared/apis/__fixtures__/weather-api-location-search-san.json';
import sanForecast from 'shared/apis/__fixtures__/weather-api-location-2487956.json';

import { homeReducer } from '..';
import { ActionTypes } from '../home.action';

const mockSearchLocationsApi = jest.fn();
const mockFetchForecastByLocationApi = jest.fn();
jest.mock('shared/apis/weather.api', () => ({
  searchLocations: (...args) => mockSearchLocationsApi(...args),
  fetchForecastByLocation: (...args) => mockFetchForecastByLocationApi(...args),
}));

describe('home.saga', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should have the expected watchers', async () => {
    const result = await expectSaga(home)
      .run({ silenceTimeout: true });
    expect(result.toJSON()).toMatchSnapshot();
  });

  describe('searchLocations', () => {
    const requestAction = {
      type: ActionTypes.SEARCH_LOCATIONS_REQUEST,
      payload: { query: 'san' },
    };

    it('should handle SUCCESS', async () => {
      mockSearchLocationsApi.mockResolvedValueOnce({ data: sanLocations });

      const result = await expectSaga(searchLocations, requestAction)
        .withReducer(homeReducer.home, homeReducer.home(undefined, requestAction))
        .run();

      expect(result.toJSON()).toMatchSnapshot();
      expect(mockSearchLocationsApi).toHaveBeenCalled();
    });

    it('should handle FAILURE', async () => {
      mockSearchLocationsApi.mockRejectedValueOnce(new Error('Failed to fetch'));

      const result = await expectSaga(searchLocations, {
        type: ActionTypes.SEARCH_LOCATIONS_REQUEST,
        payload: { query: 'san' },
      })
      .withReducer(homeReducer.home, homeReducer.home(undefined, requestAction))
      .run();

      expect(result.toJSON()).toMatchSnapshot();
      expect(mockSearchLocationsApi).toHaveBeenCalled();
    });
  });

  describe('fetchWeatherForecast', () => {
    const requestAction = {
      type: ActionTypes.FETCH_WEATHER_FORECAST_REQUEST,
      payload: { woeid: 2122 },
    };

    it('should handle SUCCESS', async () => {
      mockFetchForecastByLocationApi.mockResolvedValueOnce({ data: sanForecast });

      const result = await expectSaga(fetchWeatherForecast, requestAction)
        .withReducer(homeReducer.home, homeReducer.home(undefined, requestAction))
        .run();

      expect(result.toJSON()).toMatchSnapshot();
      expect(mockFetchForecastByLocationApi).toHaveBeenCalled();
    });

    it('should handle FAILURE', async () => {
      mockFetchForecastByLocationApi.mockRejectedValueOnce(new Error('Failed to fetch'));

      const result = await expectSaga(fetchWeatherForecast, requestAction)
      .withReducer(homeReducer.home, homeReducer.home(undefined, requestAction))
      .run();

      expect(result.toJSON()).toMatchSnapshot();
      expect(mockFetchForecastByLocationApi).toHaveBeenCalled();
    });
  });
});
