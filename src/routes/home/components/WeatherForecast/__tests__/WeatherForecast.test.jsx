import { DEFAULT_LOCATION } from 'routes/home/home.constant';
import { homeState } from 'routes/home/home.reducer';
import { homeStateFactory } from 'routes/home/__fixtures__';
import { render } from 'test/test-utils';

import { WeatherForecast } from '../WeatherForecast';

const mockDispatch = jest.fn();

describe('WeatherForecast', () => {
  it('should render correctly', () => {
    const { getByText, getByPlaceholderText } = render(<WeatherForecast defaultLocation={DEFAULT_LOCATION} />, {
      redux: { mockDispatch, initialState: { home: homeState } },
    });

    expect(getByText('5-Days Weather Forecast')).toBeInTheDocument();
    expect(getByPlaceholderText('Type a city name')).toBeInTheDocument();
  });

  it('should render loading box correctly', () => {
    const { container } = render(<WeatherForecast defaultLocation={DEFAULT_LOCATION} />, {
      redux: { mockDispatch, initialState: { home: homeStateFactory.build({ isLoading: true }).run() } },
    });

    expect(container.getElementsByClassName('default-zone')).toMatchSnapshot();
  });

  it('should render weather forecast tiles correctly', () => {
    const { container } = render(<WeatherForecast defaultLocation={DEFAULT_LOCATION} />, {
      redux: { mockDispatch, initialState: { home: homeStateFactory.build().withSampleForecast().run() } },
    });

    expect(container.getElementsByClassName('forecast-tile')).toMatchSnapshot();
  });
});
