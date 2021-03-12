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
          <Nav className="ml-auto">
            <Button
              type="button"
              variant="primary">
              Profile
            </Button>
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
            <Row className="align-items-center">
              <Col xs="auto"><p>Genre:</p></Col>
              <Col><a href="#" alt="link to genre"><p>{movie.Genre.Title}</p></a></Col>
            </Row>
            <Row className="align-items-center mb-4">
              <Col xs="auto"><p>Director:</p></Col>
              <Col><a href="#" alt="link to director"><p>{movie.Director.Name}</p></a></Col>
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