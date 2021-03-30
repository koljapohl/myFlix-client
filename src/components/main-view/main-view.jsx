import React from 'react';
import axios from 'axios';
import { Row, Col, Navbar, Nav, Button, Form } from 'react-bootstrap/';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';

import logout from '../../../public/img/log-out.svg'
import './main-view.scss';

class MainView extends React.Component {
  constructor() {
    super();
    // Inital state is set to null
    this.state = {
      movies: [],
      user: {
        username: null,
        password: null,
        email: null,
        dob: null,
        favoriteMovies: []
      },
      filter: "",
      sorted: false
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem( 'token' );
    if ( accessToken !== null ) {
      this.setState( {
        user: {
          username: localStorage.getItem( 'username' ),
          password: localStorage.getItem( 'password' ),
          email: localStorage.getItem( 'email' ),
          dob: localStorage.getItem( 'dob' ),
          favoriteMovies: localStorage.getItem( 'favoriteMovies' )
        }
      } );
      this.getMovies( accessToken );
    }
  }

  /*When a user successfully logs in, this updates the `user` property in state to
  that *particular user**/
  onLoggedIn( authData ) {
    console.log( authData );
    this.setState( {
      user: {
        username: authData.user.Username,
        password: authData.user.Password,
        email: authData.user.Email,
        dob: authData.user.Birthday,
        favoriteMovies: authData.user.FavoriteMovies
      }
    } );

    localStorage.setItem( 'favoriteMovies', JSON.stringify( authData.user.FavoriteMovies ) );
    localStorage.setItem( 'token', authData.token );
    localStorage.setItem( 'username', authData.user.Username );
    localStorage.setItem( 'password', authData.user.Password );
    localStorage.setItem( 'email', authData.user.Email );
    localStorage.setItem( 'dob', authData.user.Birthday );
    this.getMovies( authData.token );
  }

  //when user logs out its localStorage keys will be deleted
  onLogout() {
    localStorage.clear();
    this.setState( {
      user: {
        username: null
      }
    } );
    window.open( '/', '_self' );
  }

  onRegistration( uname ) {
    this.setState( {
      user: {
        username: uname
      }
    } );
    localStorage.setItem( 'username', uname );
  }

  onUpdate( data ) {
    this.setState( {
      user: {
        username: data.Username,
        password: data.Password,
        email: data.Email,
        dob: data.Birthday,
        favoriteMovies: data.FavoriteMovies
      }
    } );
    localStorage.setItem( 'username', this.state.user.username );
    localStorage.setItem( 'password', this.state.user.password );
  };

  getMovies( token ) {
    axios.get( 'https://myflix-kp.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    } )
      .then( response => {
        this.props.setMovies( response.data );
      } )
      .catch( function ( error ) {
        console.log( error );
      } );
  }

  onMovieDel() {
    this.setState( {
      user: {
        ...this.state.user,
        favoriteMovies: JSON.parse( localStorage.getItem( 'favoriteMovies' ) )
      }
    } );
  }

  toggleSort() {
    this.setState( ( currentState ) => ( {
      sorted: !currentState.sorted
    } ) );
  }

  render() {
    const { movies } = this.props;
    const { user, filter, sorted } = this.state;
    // list of filtered movies non case-sensitive!
    const movieFilter = movies.filter( movie => movie.Title.toLowerCase().includes( filter.toLowerCase() ) );
    // sort functionality (alphabetically)
    if ( sorted ) {
      movieFilter.sort( function ( a, b ) {
        var nameA = a.Title.toUpperCase();
        var nameB = b.Title.toUpperCase();
        if ( nameA < nameB ) {
          return -1;
        }
        if ( nameA > nameB ) {
          return 1;
        }
        return 0;
      } );
    }

    /* If there is no user, the LoginView is rendered. If there is a logged in user,
    the user details are *passed as a prop to the LoginView**/
    return (
      <Router>
        <Route exact path={["/", "/login"]} render={() => {
          if ( !user.username ) return (
            <LoginView onLoggedIn={data => this.onLoggedIn( data )} />
          );
          return (
            <React.Fragment>
              <Navbar sticky="top" className="px-5 py-0 mb-2">
                <Navbar.Brand className="brand" href="/">myFlix</Navbar.Brand>
                <Form inline>
                  <Form.Control
                    type="text"
                    value={this.state.filter}
                    placeholder="filter movies"
                    className="mr-2"
                    onChange={e => { this.setState( { filter: e.target.value } ) }} />
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
                    variant="primary"
                    onClick={() => this.toggleSort()}>
                    Sort
                  </Button>
                </Col>
              </Row>
              <Row className="px-5 py-3">
                <MoviesList movies={movies} />
              </Row>
            </React.Fragment>
          );
        }} />

        <Route exact path="/register" render={() => {
          return <RegistrationView onRegistration={( username ) => this.onRegistration( username )} />;
        }} />

        <Route path="/movies/:movieId"
          render={( { match } ) => {
            return <MovieView
              onClick={() => this.onLogout()}
              movie={movies.find( m => m._id === match.params.movieId )} />;
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
          return <ProfileView
            onLogout={() => this.onLogout()}
            onUpdate={( data ) => this.onUpdate( data )}
            onMovieDel={() => this.onMovieDel()}
            movies={movies} />
        }} />

        <footer className="fixed-bottom py-3 text-center">
          <p className="my-auto">myFlix Services 2021. All rights reserved &#169;</p>
        </footer>
      </Router >
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect( mapStateToProps, { setMovies } )( MainView );