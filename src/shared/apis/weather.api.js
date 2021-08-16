import Axios from 'axios';

const axios = Axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
});

/**
 * Searches locations by a query string
 * @see {@link https://www.metaweather.com/api/#locationsearch}
 *
 * @param {string} query The query string
 * @returns {Promise} A promise
 */
function searchLocations(query) {
  return axios.get(`/location/search/?query=${query}`);
}

/**
 * Fetches forecast data by a location woeid
 * @see {@link https://www.metaweather.com/api/#location}
 *
 * @param {string} query The woeid
 * @returns {Promise} A promise
 */
function fetchForecastByLocation(woeid) {
  return axios.get(`/location/${woeid}/`);
}

const weatherApi = {
  searchLocations,
  fetchForecastByLocation
}

export default weatherApi;
