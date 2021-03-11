import React from 'react';
import axios from 'axios';
import { Row, Col, Navbar, Nav, Button, Container } from 'react-bootstrap/';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import logout from '../../../public/img/log-out.svg'
import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();
    // Inital state is set to null
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      newUser: false
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem( 'token' );
    if ( accessToken !== null ) {
      this.setState( {
        user: localStorage.getItem( 'user' )
      } );
      this.getMovies( accessToken );
    }
  }

  /*When a movie is clicked, this updates the state of `selectedMovie` 
  property to that clicked on movie*/
  onMovieClick( movie ) {
    this.setState( {
      selectedMovie: movie
    } );
  }

  /*When a user successfully logs in, this updates the `user` property in state to
  that *particular user**/
  onLoggedIn( authData ) {
    console.log( authData );
    this.setState( {
      user: authData.user.Username
    } );
    localStorage.setItem( 'token', authData.token );
    localStorage.setItem( 'user', authData.user.Username );
    this.getMovies( authData.token );
  }

  //when user logs out its localStorage keys will be deleted
  onLogout() {
    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'user' );
    this.setState( {
      user: null
    } );
  }

  getMovies( token ) {
    axios.get( 'https://myflix-kp.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    } )
      .then( response => {
        this.setState( {
          movies: response.data
        } );
      } )
      .catch( function ( error ) {
        console.log( error );
      } );
  }
  /*This toggles whether Registration Form is displayed or not - otherwise Login will be shown*/
  onRegistration( regis ) {
    this.setState( {
      newUser: regis
    } );
  }

  render() {
    const { movies, selectedMovie, user, newUser } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a logged in user,
    the user details are *passed as a prop to the LoginView**/

    if ( !user && !newUser ) return (
      <Row className="justify-content-center">
        <Col className="px-5">
          <Navbar className="mb-5 mt-3">
            <Navbar.Brand className="brand">Log in to myFlix</Navbar.Brand>
          </Navbar>
          <LoginView onRegistration={( regis ) => this.onRegistration( regis )}
            onLoggedIn={user => this.onLoggedIn( user )} />
        </Col>
      </Row>
    );

    if ( newUser ) return (
      <Row className="justify-content-center">
        <Col className="px-5">
          <Navbar className="mb-5 mt-3">
            <Navbar.Brand className="brand">Register for myFlix</Navbar.Brand>
          </Navbar>
          <RegistrationView onRegistration={( regis ) => this.onRegistration( regis )}
            onLoggedIn={user => this.onLoggedIn( user )} />
        </Col>
      </Row>

    )

    // before movies have been loaded
    if ( !movies ) return <div className="main-view" />;

    return (
      // single MovieView
      <Row className="main-view justify-content-center my-4">
        {selectedMovie
          ?
          (
            <React.Fragment>
              <Row className="px-5">
                <MovieView onClick={() => this.onMovieClick( null )}
                  movie={selectedMovie} />
              </Row>
            </React.Fragment>
          )
          //MainView
          : (
            <Container fluid>
              <Navbar className="px-5 py-0 mb-2">
                <Navbar.Brand className="brand" href="#home">myFlix</Navbar.Brand>
                <Nav className="buttons">
                  <Button className="btn-logout"
                    variant="link"
                    type="button"
                    onClick={() => this.onLogout()}>
                    <img className="logout" src={logout} alt="logout icon" />
                  </Button>
                </Nav>
              </Navbar>
              <Row className="px-5 my-4">
                <Col className="">
                  <Button
                    type="button"
                    variant="primary"
                    className="mr-4">
                    Filter
                  </Button>
                  <Button
                    type="button"
                    variant="primary">
                    Sort
                  </Button>
                </Col>
                <Col className="btn-profile_wrapper">
                  <Button
                    type="button"
                    variant="primary"
                  >
                    Profile</Button>
                </Col>
              </Row>
              <Row className="px-5 py-3">
                {movies.map( movie => (
                  <Col className="pb-3" key={movie._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <MovieCard
                      key={movie._id}
                      movie={movie}
                      onClick={( movie ) => this.onMovieClick( movie )}
                    />
                  </Col>
                ) )}
              </Row>
            </Container>
          )
        }
      </Row>
    );
  }
}