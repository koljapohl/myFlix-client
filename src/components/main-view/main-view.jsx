import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null
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

  onMovieClick( movie ) {
    this.setState( {
      selectedMovie: movie
    } );
  }

  onButtonClick() {
    this.setState( {
      selectedMovie: null
    } );
  }

  render() {
    const { movies, selectedMovie } = this.state;

    // before movies have been loaded
    if ( !movies ) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView onClick={() => this.onButtonClick()} movie={selectedMovie} />
          : movies.map( movie => (
            <MovieCard key={movie._id} movie={movie} onClick={( movie ) => this.onMovieClick( movie )} />
          ) )
        }
      </div>
    );
  }
}