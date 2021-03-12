import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Nav, Navbar, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';

import arrow from '../../../public/img/arrow.svg';
import logout from '../../../public/img/log-out.svg';
import './profile-view.scss';
import { propTypes } from 'react-bootstrap/esm/Image';

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      validated: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem( 'token' );
    if ( accessToken !== null ) {
      this.getUser( accessToken );
    }
  }

  getUser( token ) {
    let username = localStorage.getItem( 'user' );
    axios.get( `https://myflix-kp.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    } )
      .then( response => {
        this.setState( {
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        } );
      } )
      .catch( function ( error ) {
        console.log( error );
      } );
  }

  render() {
    const { FavoriteMovies, validated } = this.state;
    const { user } = localStorage.getItem( 'user' );
    const { movies } = this.props;

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
            <Button className="btn-logout"
              variant="link"
              type="button"
              onClick={() => onClick()}>
              <img className="logout" src={logout} alt="logout icon" />
            </Button>
          </Nav>
        </Navbar>
        <Container fluid className="px-5">

        </Container>
      </React.Fragment>
    )
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape( {
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape( {
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired
      } )
    ),
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.instanceOf( Date )
  } )
}