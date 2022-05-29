import React from 'react';

import { MovieCard } from '../movie-card/movie-card';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
    const {
      genre,
      onBackClick,
      genreMovies,
      accessFavorites,
      updateFavorites,
    } = this.props;

    const favorites = accessFavorites();

    //generator for movies of the same genre - finds them in the full list of movies
    let genreCards = genreMovies.map((m) => (
      <Col md={4} key={m._id}>
        <MovieCard
          movie={m}
          isFavorite={favorites.includes(m._id)}
          favorites={favorites}
          updateFavorites={(mid) => this.props.updateFavorites(mid)}
        />
      </Col>
    ));

    return (
      <div className="genre-wrapper">
        <div className="movie-view tp-movie">
          <div className="movie-genre mov-section">
            <div>{genre.Name}</div>
            <br></br>
            <span>{genre.Description}</span>
          </div>
          <Button
            variant="secondary"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </div>
        <div className="movie-view bt-movie">
          <div>{genre.Name} Movies:</div>
          <Row>{genreCards}</Row>
        </div>
      </div>
    );
  }
}