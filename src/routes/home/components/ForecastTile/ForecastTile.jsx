import React, { useMemo } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { useIntl } from 'react-intl';

import './ForecastTile.style.scss';

function ForecastTile({ forecast }) {
  const intl = useIntl();
  const { temp, minTemp, maxTemp } = useMemo(
    () => ({
      temp: Math.round(forecast.temp),
      minTemp: Math.round(forecast.minTemp),
      maxTemp: Math.round(forecast.maxTemp),
    }),
    [forecast]
  );

  return (
    <div className='forecast-tile mb-2 border rounded'>
      <Row>
        <Col xs={3}>
          <div className='d-flex flex-column'>
            <p className='mb-0 text-uppercase fs-3'>{intl.formatDate(forecast.date, { weekday: 'short' })}</p>
            <div className='humidity'>
              <div>
                <i className='bi bi-droplet-fill'></i>{' '}
                <span className='text-muted'>{intl.formatNumber(forecast.humidity)}%</span>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={3}>
          <Image className='w-image' src={forecast.weatherStateImage} />
        </Col>
        <Col xs={6} className='d-flex justify-content-end'>
          <div className='temperature d-flex flex-row'>
            <div className='temperature__value d-flex flex-column text-end'>
              <div>
                <span className='fs-3'>{intl.formatNumber(temp, { style: 'unit', unit: 'celsius' })}</span>
              </div>
              <div className='text-muted'>
                <span>{intl.formatNumber(minTemp, { style: 'unit', unit: 'celsius' })}</span> -{' '}
                <span>{intl.formatNumber(maxTemp, { style: 'unit', unit: 'celsius' })}</span>
              </div>
            </div>
            <div className='temperature__icon align-self-center'>
              <i className='bi bi-thermometer-sun fs-1'></i>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export { ForecastTile }