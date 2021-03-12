import React from 'react';
import PropTypes from 'prop-types';
import { Form, Navbar, Nav, Row, Col, Button } from 'react-bootstrap/';
import { Link } from 'react-router-dom';

import arrow from '../../../public/img/arrow.svg';
import logout from '../../../public/img/log-out.svg'
import './movie-view.scss';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;

    if ( !movie ) return null;

    return (
      <React.Fragment>
        <Navbar sticky="top" className="px-5 py-0 mb-2">
          <Navbar.Brand className="brand" href="/">myFlix</Navbar.Brand>
          <Nav className="ml-auto button-wrapper">
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
        <Row className="px-5 mb-4">
          <Col xs="auto">
            <Link to={"/"} className="btn-back px-0">
              <img className="arrow" src={arrow} alt="back icon" />
            </Link>
          </Col>
          <Col>
            <h1 className="brand my-auto">{movie.Title}
              <Button variant="link" type="button">Star</Button></h1>
          </Col>
        </Row>
        <Row className="px-5 content-body">
          <Col className="content-text" md={8}>
            <Row className="align-items-center mb-2">
              <Col xs="auto">Genre:</Col>
              <Link to={`/genres/${movie.Genre.Title}`} className="px-0">
                {movie.Genre.Title}
              </Link>
            </Row>
            <Row className="align-items-center mb-4">
              <Col xs="auto">Director:</Col>
              <Link to={`/directors/${movie.Director.Name}`} >
                {movie.Director.Name}
              </Link>
            </Row>
            <Row className="description">
              <Col>
                <h4>Description</h4>{movie.Description}
              </Col>
            </Row>
          </Col>
          <Col><img className="movie-poster" src={movie.ImagePath} /></Col>
        </Row>
      </React.Fragment>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape( {
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape( {
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string
    } ).isRequired,
    Director: PropTypes.shape( {
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      BirthYear: PropTypes.string
    } ).isRequired,
    Featured: PropTypes.bool,
    _id: PropTypes.string,
  } ).isRequired,
  onClick: PropTypes.func.isRequired
}