import { render } from 'test/test-utils';

import { ForecastTile } from '..';

describe('ForecastTile', () => {
  it('should render properly', () => {
    const forecast = {
      maxTemp: 31.075000000000003,
      minTemp: 25.095,
      date: '2021-08-15',
      weatherStateAbbr: 'hr',
      weatherStateImage: 'https://www.metaweather.com/static/img/weather/png/64/hr.png',
      humidity: 76,
      temp: 30.259999999999998
    };

    const { container } = render(<ForecastTile forecast={forecast} />);

    expect(container).toMatchSnapshot();
  })
});