import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    // this is given to MovieCard component by the outer world (MainView)
    const { movie, onClick } = this.props;
    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button variant="secondary" onClick={() => onClick( movie )}>Open</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
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
  } ).isRequired,
  onClick: PropTypes.func.isRequired
};