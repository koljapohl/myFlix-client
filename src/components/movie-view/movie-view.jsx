import React from 'react';
import PropTypes from 'prop-types';
import { Container, Navbar, Nav, Row, Col, Button } from 'react-bootstrap/';

import arrow from '../../../public/img/arrow.svg';
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
      <Container>
        <Navbar className="px-0 mb-4">
          <Button
            className="btn-back"
            variant="link"
            type="button"
            onClick={() => onClick()}>
            <img className="arrow" src={arrow} alt="back icon" />
          </Button>
          <Navbar.Brand>
            <h1 className="brand my-auto">{movie.Title}
              <Button variant="link" type="button">Star</Button></h1>
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link className="nav-item__last" href="#">
              <Button
                variant="primary"
                type="button"
                className="btn-profile btn-last">
                Profile <em>handler!!</em>
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar>
        <Row className="content-body">
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
      </Container>
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