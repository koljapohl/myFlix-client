import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Row, Col, Button, Container } from 'react-bootstrap/';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import { setUser } from '../../actions/actions';
import arrow from '../../../public/img/arrow.svg';
import logout from '../../../public/img/log-out.svg'
import './movie-view.scss';

class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleFavorite( movie ) {
    let token = localStorage.getItem( 'token' );
    if ( this.props.user.FavoriteMovies.indexOf( movie._id ) > -1 ) {
      alert( `${movie.Title} is already one of your favorites.` );
    } else {
      axios.post( `https://myflix-kp.herokuapp.com/users/${this.props.user.Username}/movies/${movie._id}`, {},
        {
          headers: { Authorization: `Bearer ${token}` }
        } )
        .then( () => {
          this.props.setUser( {
            ...this.props.user,
            FavoriteMovies: [movie._id, ...this.props.user.FavoriteMovies]
          } );
          alert( `${movie.Title} was successfully added to your favorites list.` );
          localStorage.setItem( 'favoriteMovies', JSON.stringify( this.props.user.FavoriteMovies ) );
        } )
        .catch( error => {
          console.error( error );
        } );
    }
  }

  render() {
    const { movie, onClick, user } = this.props;

    if ( !movie ) return null;

    return (
      <Container fluid className="movie-view pb-5">
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
          <Col xs="auto">
            <h1 className="brand my-auto">{movie.Title}</h1>
          </Col>
          <Col>
            <Button
              className="ml-4"
              onClick={() => { this.handleFavorite( movie ) }}
              variant="outline-primary"
              type="button">
              Add to favorites
            </Button>
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
      </Container>
    );
  }
}

let mapStateToProps = state => {
  return { user: state.user }
}

export default connect( mapStateToProps, { setUser } )( MovieView );

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
  } ),
  onClick: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  user: PropTypes.shape( {
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string,
    Dob: PropTypes.Date
  } )
}