import React from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './movie-view.scss';

//showing details once MovieCard is clicked
export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster d-flex justify-content-center">
          <img src={movie.ImagePath} crossOrigin="anonymous" />
        </div>
        <div className="movie-title mov-section">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description mov-section">
          <span className="label">
            Description:<br></br>{' '}
          </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-director mov-section">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <div className="movie-genre mov-section">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <Row className="d-flex text-center">
          <Col md={6}>
            <Link
              to={`/directors/${movie.Director.Name}`}
              className="movie-opt"
            >
              <Button variant="secondary">More from this Director</Button>
            </Link>
          </Col>
          <Col md={6}>
            <Link to={`/genres/${movie.Genre.Name}`} className="movie-opt">
              <Button variant="secondary">More from this Genre</Button>
            </Link>
          </Col>
        </Row>

        <Row md={12} className="d-flex text-center">
          <Col>
            <Button
              variant="secondary"
              className="back-btn"
              onClick={() => {
                onBackClick();
              }}
            >
              Back
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }).isRequired,

  onBackClick: PropTypes.func.isRequired,
};