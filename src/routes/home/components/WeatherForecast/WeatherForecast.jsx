import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { fetchWeatherForecast } from 'routes/home/home.action';

import { ForecastTile } from '../ForecastTile';
import { LocationSearchbox } from '../LocationSearchbox';

import './WeatherForecast.style.scss';

/**
 * Weather forecast component
 *
 * @param {object} selected The selected options
 * @param {function} 
 * @returns {JSX.Element}
 */
export function WeatherForecast({ defaultLocation }) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState([defaultLocation]);
  const isLoading = useSelector(({ home }) => home.isLoading);
  const forecast = useSelector(({ home }) => home.forecast);

  useEffect(() => {
    const [location] = selectedLocation;

    location && dispatch(fetchWeatherForecast({ woeid: location.woeid }));
  }, [selectedLocation, dispatch]);

  const handleLocationChange = useCallback((selected) => {
    setSelectedLocation(selected);
  }, []);

  return (
    <div className='weather-forecast'>
      <Row>
        <Col>
          <h2 className='text-center mb-4 text-uppercase text-white'>
            {intl.formatMessage({ id: 'weather.forecast.title', defaultMessage: '5-Days Weather Forecast' })}
          </h2>
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col>
          <LocationSearchbox onChange={handleLocationChange} selected={selectedLocation} />
        </Col>
      </Row>
      <Row>
        <Col>
          {isLoading ? (
            <div className='default-zone border rounded'>
              <Spinner animation="border" variant="info" />
            </div>
          ) : (
            forecast.map((forecast, index) => <ForecastTile key={index} forecast={forecast} />)
          )}
        </Col>
      </Row>
    </div>
  );
}