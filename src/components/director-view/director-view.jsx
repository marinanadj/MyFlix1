import React from 'react';

import { MovieCard } from '../movie-card/movie-card';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './director-view.scss';

export class DirectorView extends React.Component {
  //resetting window to top for component
  componentDidMount() {
    window.scrollTo(0, 0);
  }


  render() {
    const {
      director,
      onBackClick,
      directorMovies,
      accessFavorites,
      updateFavorites,
    } = this.props;

    const favorites = accessFavorites();

    //generator for movies by the same director.
    let directorCards = directorMovies.map((m) => (
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
      <div className="director-wrapper">
        <div className="movie-view tp-movie">
          <div className="movie-genre mov-section">
            <div>{director.Name}</div>
            <br></br>
            <div>{director.Bio}</div>
            <br></br>
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
          <div>{director.Name} Movies:</div>
          <Row>{directorCards}</Row>
        </div>
      </div>
    );
  }
}