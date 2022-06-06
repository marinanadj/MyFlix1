import React from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './movie-view.scss';

//showing details once MovieCard is clicked
export class MovieView extends React.Component {
  //resetting window to top for component
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <Row className="details-wrapper">
          <Col lg={6}>
            <div className="movie-poster d-flex">
              <img src={movie.ImagePath} crossOrigin="anonymous" />
            </div>
          </Col>
          <Col lg={6} className="d-flex flex-column">
            <div className="movie-details align-self-center">
              <div className="movie-title mov-section">
                <span className="value">
                  <h3>{movie.Title}</h3>
                </span>
                <span className="value">{movie.Genre.Name}</span>
              </div>
              <div className="movie-actors mov-section">
                <span className="value">
                  {movie.Actors ? movie.Actors.join(' / ') : ''}
                </span>
              </div>
              <div className="movie-description mov-section">
                <span className="value">{movie.Description}</span>
              </div>
              <div className="movie-director mov-section">
                <span className="label">Director: </span>
                <span className="value">
                  {movie.Director.Name ? movie.Director.Name : 'N/A'}
                </span>
              </div>
              <div className="movie-rating mov-section">
                <span className="label">Rating: </span>
                <span className="value">
                  {movie.Rating ? movie.Rating : 'N/A'}
                </span>
              </div>
            </div>
            <div className="button-wrapper">
              <Link
                to={`/directors/${movie.Director.Name}`}
                className="movie-opt"
              >
                {movie.Director.Name ? (
                  <Button variant="secondary">More from this Director</Button>
                ) : (
                  <Button disabled variant="secondary">
                    More from this Director
                  </Button>
                )}
              </Link>
              <Link to={`/genres/${movie.Genre.Name}`} className="movie-opt">
                {movie.Genre.Name ? (
                  <Button variant="secondary">More from this Genre</Button>
                ) : (
                  <Button disabled variant="secondary">
                    More from this Genre
                  </Button>
                )}
              </Link>
              <Button
                variant="secondary"
                className="back-btn"
                onClick={() => {
                  onBackClick();
                }}
              >
                Back
              </Button>
            </div>
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