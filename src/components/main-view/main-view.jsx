import React from 'react';
import axios from 'axios';
import { Row, Col, Navbar, Nav, Button, Form } from 'react-bootstrap/';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';

import logout from '../../../public/img/log-out.svg'
import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();
    // Inital state is set to null
    this.state = {
      movies: [],
      user: null
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
    window.open( '/', '_self' );
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

  render() {
    const { movies, user } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a logged in user,
    the user details are *passed as a prop to the LoginView**/
    return (
      <Router>
        <Route exact path={["/", "/login"]} render={() => {
          if ( !user ) return (
            <LoginView onLoggedIn={data => this.onLoggedIn( data )} />
          );
          return (
            <React.Fragment>
              <Navbar sticky="top" className="px-5 py-0 mb-2">
                <Navbar.Brand className="brand" href="/">myFlix</Navbar.Brand>
                <Form inline>
                  <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-primary">Search</Button>
                </Form>
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
                    onClick={() => this.onLogout()}>
                    <img className="logout" src={logout} alt="logout icon" />
                  </Button>
                </Nav>
              </Navbar>
              <Row className="px-5 my-4">
                <Col className="">
                  <Button
                    type="button"
                    variant="primary">
                    Sort
                  </Button>
                </Col>
              </Row>
              <Row className="px-5 py-3">
                {movies.map( movie => (
                  <Col className="pb-3" key={movie._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <MovieCard
                      key={movie._id}
                      movie={movie}
                    />
                  </Col>
                ) )}
              </Row>
            </React.Fragment>
          )
        }} />

        <Route exact path="/register" render={() => {
          return <RegistrationView />;
        }} />

        <Route path="/movies/:movieId" render={( { match } ) => {
          return <MovieView onClick={() => this.onLogout()} movie={movies.find( m => m._id === match.params.movieId )} />;
        }
        } />

        <Route path="/genres/:title" render={( { match } ) => {
          return <GenreView onClick={() => this.onLogout()} genre={movies.find( g => g.Genre.Title === match.params.title ).Genre} movies={movies} />;
        }
        } />

        <Route path="/directors/:name" render={( { match } ) => {
          return <DirectorView onClick={() => this.onLogout()} movie={movies.find( d => d.Director.Name === match.params.name )} movies={movies} />;
        }} />

        <Route path="/users/me" render={( { match } ) => {
          return <ProfileView movies={movies} />
        }} />
      </Router >
    );
  }
}