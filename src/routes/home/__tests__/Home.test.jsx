import { cleanup, fireEvent, render, waitFor } from 'test/test-utils';

import hcmForecast from 'shared/apis/__fixtures__/weather-api-location-1252431.json';
import sanForecast from 'shared/apis/__fixtures__/weather-api-location-2487956.json';

import Home from '..';
import { DEFAULT_LOCATION } from '../home.constant';

const mockSearchLocationsApi = jest.fn();
const mockFetchForecastByLocationApi = jest.fn();
jest.mock('shared/apis/weather.api', () => ({
  searchLocations: (...args) => mockSearchLocationsApi(...args),
  fetchForecastByLocation: (...args) => mockFetchForecastByLocationApi(...args),
}));

describe('Home', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render initial forecast for the default city', async () => {
    mockFetchForecastByLocationApi.mockResolvedValueOnce({ data: hcmForecast });
    const { container } = render(<Home />, { redux: { integration: true } });

    await waitFor(() => {
      expect(container.getElementsByClassName('forecast-tile').length).toBe(5)
    });

    expect(mockFetchForecastByLocationApi).toHaveBeenCalled();
    expect(container.getElementsByClassName('forecast-tile')).toMatchSnapshot();
  });

  it('should allow to search a city', async () => {
    mockFetchForecastByLocationApi
      .mockResolvedValueOnce({ data: hcmForecast })
      .mockResolvedValueOnce({ data: sanForecast });
    const expectedQuery = 'san';
    const expectedLocations = [
      { title: 'San Francisco', woeid: 2487956 },
      { title: 'San Jose', woeid: 2488042 },
    ];
    mockSearchLocationsApi.mockResolvedValue({
      data: expectedLocations,
    });
    const { getByRole, getAllByRole } = render(<Home />, { redux: { integration: true } });

    const input = getByRole('combobox');

    // When we change the current input value to "san"
    fireEvent.change(input, { target: { value: expectedQuery } });

    await waitFor(() => {
      // Wait for the input to display to suggestion options: "San Francisco" and "San Jose"
      expect(getAllByRole('option').length).toBe(2);
    });

    // We expect that the search location api was just called once with the query is "san"
    expect(mockSearchLocationsApi).toHaveBeenCalledTimes(1);
    expect(mockSearchLocationsApi).toHaveBeenCalledWith(expectedQuery);

    // Click on the first suggestion option
    fireEvent.click(getAllByRole('option')[0]);

    // Totally the fetch forecast api was called 2 times where the first is to fetch the default forecast data,
    // and the last is to fetch forecast for the selected option when searching with "san" keyword
    expect(mockFetchForecastByLocationApi).toHaveBeenCalledTimes(2);
    expect(mockFetchForecastByLocationApi).toHaveBeenNthCalledWith(1, DEFAULT_LOCATION.woeid);
    expect(mockFetchForecastByLocationApi).toHaveBeenNthCalledWith(2, expectedLocations[0].woeid);
  });
});
