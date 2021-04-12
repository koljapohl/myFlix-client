import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap/';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export default class MovieCard extends React.Component {
  render() {
    // this is given to MovieCard component by the outer world (MainView)
    const { movie } = this.props;
    let description = movie.Description.slice( 0, 150 ) + '[...]';
    return (
      <Card border="primary" className="mx-auto" >
        <Card.Header>
          <Card.Img
            variant="top"
            src={movie.ImagePath}
          />
        </Card.Header>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text className="description">{description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
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
};