import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap/';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    // this is given to MovieCard component by the outer world (MainView)
    const { movie, onClick } = this.props;
    let description = movie.Description.slice( 0, 150 ) + '[...]';
    return (
      <Card border="primary" className="mx-auto" >
        <Card.Header>
          <Card.Img
            onClick={() => onClick( movie )}
            variant="top"
            src={movie.ImagePath}
            className="img-button"
          />
        </Card.Header>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text className="description">{description}</Card.Text>
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