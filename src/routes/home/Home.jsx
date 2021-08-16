import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { WeatherForecast } from './components/WeatherForecast';
import { DEFAULT_LOCATION } from './home.constant';

/**
 * Home component
 *
 * @returns {JSX.Element}
 */
const Home = () => {
  return (
    <Container>
      <Row>
        <Col lg={{ span: 6, offset: 3 }} className='pt-4'>
          <WeatherForecast defaultLocation={DEFAULT_LOCATION} />
        </Col>
      </Row>
      <Row>
        <a
          href='https://github.com/liepvn'
          target='_blank'
          rel='noopener noreferrer'
          className='text-white text-center text-decoration-none mt-3'
        >
          <i className='bi bi-github'></i> <span>Fork it on Github</span>
        </a>
      </Row>
    </Container>
  );
};

export default Home;
