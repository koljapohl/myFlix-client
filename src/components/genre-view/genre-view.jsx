import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Nav, Navbar, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';

import arrow from '../../../public/img/arrow.svg';
import logout from '../../../public/img/log-out.svg'
import './genre-view.scss';

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { onClick, genre, movies } = this.props;

    const selection = movies.filter( c => c.Genre.Title === genre.Title );

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
          <Row className="mb-5">
            <Col xs="auto">
              <Link to={`/movies/${selection[0]._id}`} className="btn-back px-0">
                <img className="arrow" src={arrow} alt="back icon" />
              </Link>
            </Col>
            <Col>
              <h1 className="brand my-auto">{genre.Title}</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>Description</h5>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col md={8} className="description">
              {genre.Description}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <h6>Exemplary movies of the genre {genre.Title}</h6>
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

GenreView.propTypes = {
  genre: PropTypes.shape( {
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  } ).isRequired,
  onClick: PropTypes.func.isRequired
}