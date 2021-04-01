import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Button } from 'react-bootstrap';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

import { setSort } from '../../actions/actions';

const mapStateToProps = state => {
  const { visibilityFilter, sort } = state;
  return { visibilityFilter, sort };
};

function MoviesList( props ) {
  const { movies, visibilityFilter, sort } = props;
  let filteredMovies = movies;

  // sort functionality (alphabetically)
  if ( sort ) {
    filteredMovies.sort( function ( a, b ) {
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
  } else {
    filteredMovies = movies;
  }

  // filter functionality
  if ( visibilityFilter !== '' ) {
    filteredMovies = movies.filter( m => m.Title.toLowerCase().includes( visibilityFilter.toLowerCase() ) );
  }

  if ( !movies ) return <div className="main-view" />;

  return ( <React.Fragment>
    <Row>
      <Col className="mx-3">
        <Button
          type="button"
          variant="primary"
          onClick={() => props.setSort( !sort )}>
          Sort
        </Button>
      </Col>
      <Col className="filter-input mx-3 mb-3" xs={5} sm={4} md={3}>
        <VisibilityFilterInput />
      </Col>
    </Row>
    {filteredMovies.map( m =>
      <Col className="pb-3" key={m._id}>
        <MovieCard key={m._id} movie={m} />
      </Col>
    )}

  </React.Fragment>
  );
}

export default connect( mapStateToProps, { setSort } )( MoviesList );

MoviesList.propTypes = {
  visibilityFilter: PropTypes.string,
  setSort: PropTypes.func
}