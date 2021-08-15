import { cloneDeep } from 'lodash';

import { homeState } from 'routes/home/home.reducer';

class HomeStateFactory {
  newState = {};

  build(props = {}) {
    this.newState = Object.assign(cloneDeep(homeState), props);

    return this;
  }

  withSampleForecast() {
    Object.assign(this.newState, {
      forecast: [
        {
          maxTemp: 32.06,
          minTemp: 24.880000000000003,
          date: '2021-08-15',
          weatherStateAbbr: 'hr',
          weatherStateImage: 'https://www.metaweather.com/static/img/weather/png/64/hr.png',
          humidity: 73,
          temp: 30.515,
        },
        {
          maxTemp: 33.995000000000005,
          minTemp: 24.725,
          date: '2021-08-16',
          weatherStateAbbr: 'lr',
          weatherStateImage: 'https://www.metaweather.com/static/img/weather/png/64/lr.png',
          humidity: 68,
          temp: 32.370000000000005,
        },
        {
          maxTemp: 33.825,
          minTemp: 24.685,
          date: '2021-08-17',
          weatherStateAbbr: 'hr',
          weatherStateImage: 'https://www.metaweather.com/static/img/weather/png/64/hr.png',
          humidity: 70,
          temp: 31.630000000000003,
        },
        {
          maxTemp: 33.89,
          minTemp: 25.35,
          date: '2021-08-18',
          weatherStateAbbr: 'hr',
          weatherStateImage: 'https://www.metaweather.com/static/img/weather/png/64/hr.png',
          humidity: 69,
          temp: 31.685000000000002,
        },
        {
          maxTemp: 33.835,
          minTemp: 25.455,
          date: '2021-08-19',
          weatherStateAbbr: 'hr',
          weatherStateImage: 'https://www.metaweather.com/static/img/weather/png/64/hr.png',
          humidity: 70,
          temp: 31.515,
        },
      ],
    });

    return this;
  }

  run() {
    return this.newState;
  }
}

const homeStateFactory = new HomeStateFactory();

export { homeStateFactory };
