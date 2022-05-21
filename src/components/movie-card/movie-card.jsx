import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
     return (
        <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
        </Card.Body>
        </Card>
        );
      }
    }

    MovieCard.propTypes = {
      movie: PropTypes.shape({
          ImagePath: PropTypes.string.isRequired,
          Title: PropTypes.string.isRequired,
          Description: PropTypes.string.isRequired,
          }).isRequired,
          onMovieClick: PropTypes.func.isRequired
      };
     
 