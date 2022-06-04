import React from 'react';
import PropTypes from 'prop-types';

import moviecard from '../movie-card/movie-card';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import './director-view.scss';

class DirectorView extends React.Component {
  //resetting window to top for component
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleOnItemClick = (param) => (e) => {
    const { history } = withRouter;
    this.props.history.push(`/movies/${param}`);
  };

  render() {
    const { director, onBackClick, directorMovies, accessFavorites } =
      this.props;

    //generator for movies by the same director.
    let directorCards = directorMovies.map((m) => (
      <Col md={3} key={m._id}>
        <MovieCard
          movie={m}
          onMovieClick={() => this.handleOnItemClick(m._id)}
        />
      </Col>
    ));

    return (
      <div className="director-wrapper">
        <div className="movie-view tp-movie">
          <div className="movie-genre mov-section">
            <div>
              <h3>{director.Name}</h3>
              <Button
                variant="secondary"
                onClick={() => {
                  onBackClick();
                }}
              >
                Back
              </Button>
            </div>
            <br></br>
          </div>
        </div>
        <div className="movie-view bt-movie">
          {/* returning list of movies directed by current director */}
          <div className="cards-header">
            Also directed by {director.Name} ({directorMovies.length}):
          </div>
          <Row>{directorCards}</Row>
        </div>
      </div>
    );
  }
}

export default withRouter(DirectorView);

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};