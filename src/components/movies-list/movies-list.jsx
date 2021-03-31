import React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList( props ) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if ( visibilityFilter !== '' ) {
    filteredMovies = movies.filter( m => m.Title.toLowerCase().includes( visibilityFilter.toLowerCase() ) );
  }

  if ( !movies ) return <div className="main-view" />;

  return ( <React.Fragment>
    <Row>
      <Col className="filter-input mx-3 mb-3" xs={5} sm={4} md={3}>
        <VisibilityFilterInput />
      </Col>
    </Row>
    {filteredMovies.map( m =>
      <Col>
        <MovieCard key={m._id} movie={m} />
      </Col>
    )}

  </React.Fragment>
  );
}

export default connect( mapStateToProps )( MoviesList );