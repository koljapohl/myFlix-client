import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Nav, Navbar, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';

import arrow from '../../../public/img/arrow.svg';
import logout from '../../../public/img/log-out.svg'
import './director-view.scss';

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { onClick, movie, movies } = this.props;

    const selection = movies.filter( d => d.Director.Name === movie.Director.Name );

    if ( !movies ) return <div className="main-view" />;
    return (
      <React.Fragment>
        <Navbar sticky="top" className="px-5 py-0 mb-2">
          <Navbar.Brand className="brand" href="/">myFlix</Navbar.Brand>
          <Nav className="ml-auto button-wrapper">
            <Link to={'/'}>
              <Button
                type="button"
                variant="primary"
                className="mx-2">
                All movies
              </Button>
            </Link>
            <Link to={'/users/me'}>
              <Button
                type="button"
                variant="primary">
                Profile
            </Button>
            </Link>
            <Button className="btn-logout"
              variant="link"
              type="button"
              onClick={() => onClick()}>
              <img className="logout" src={logout} alt="logout icon" />
            </Button>
          </Nav>
        </Navbar>
        <Container fluid className="px-5">
          <Row className="mb-2">
            <Col xs="auto">
              <Link to={`/movies/${selection[0]._id}`} className="btn-back px-0">
                <img className="arrow" src={arrow} alt="back icon" />
              </Link>
            </Col>
            <Col>
              <h1 className="brand my-auto">{movie.Director.Name}</h1>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              Born in {( movie.Director.BirthYear ).slice( 0, 4 )}
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>Biography</h5>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col md={8}>
              {movie.Director.Bio}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <h6>Exemplary movies from director {movie.Director.Name}</h6>
            </Col>
          </Row>
          <Row>
            {selection.map( movie => (
              <Col className="pb-3" key={movie._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <MovieCard
                  key={movie._id}
                  movie={movie}
                />
              </Col>
            ) )}
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

DirectorView.propTypes = {
  movie: PropTypes.shape( {
    Director: PropTypes.shape( {
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    } ).isRequired
  } ).isRequired,
  onClick: PropTypes.func.isRequired
}