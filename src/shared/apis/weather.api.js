import Axios from 'axios';

const axios = Axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
});

function searchLocations(query) {
  return axios.get(`/location/search/?query=${query}`);
}

function fetchForecastByLocation(woeid) {
  return axios.get(`/location/${woeid}/`);
}

const weatherApi = {
  searchLocations,
  fetchForecastByLocation
}

export default weatherApi;
