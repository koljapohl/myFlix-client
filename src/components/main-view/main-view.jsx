import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();
    // Inital state is set to null
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    //https://myflix-kp.herokuapp.com
    axios.get( 'https://myflix-kp.herokuapp.com/movies' )
      .then( ( response ) => {
        this.setState( {
          movies: response.data
        } );
      } )
      .catch( function ( error ) {
        console.log( error );
      } );
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

  onLoggedIn( user ) {
    this.setState( {
      user
    } );
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a logged in user,
    the user details are *passed as a prop to the LoginView**/

    if ( !user ) return <LoginView onLoggedIn={user => this.onLoggedIn( user )} />

    // before movies have been loaded
    if ( !movies ) return <div className="main-view" />;

    return (
      <Row className="main-view justify-content-md-center">
        {selectedMovie
          ? (
            <Col md={8}>
              <MovieView onClick={() => this.onMovieClick( null )}
                movie={selectedMovie} />
            </Col>
          )
          : (
            movies.map( movie => (
              <Col md={3}>
                <MovieCard key={movie._id} movie={movie}
                  onClick={( movie ) => this.onMovieClick( movie )} />
              </Col>
            ) )
          )
        }
      </Row>
    );
  }
}