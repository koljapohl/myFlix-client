import React from 'react';

export class MovieCard extends React.Component {
  render() {
    // this is given to MovieCard component by the outer world (MainView)
    const { movie, onClick } = this.props;
    return (
      <div onClick={() => onClick( movie )} className='movie-card'>{movie.Title}</div>
    );
  }
}