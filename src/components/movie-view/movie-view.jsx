import React from 'react';
import axios from 'axios';

import LoadingSpinner from '../spinner/spinner';

import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { connect } from 'react-redux';
import { setMovies } from '../../actions/actions';

import './movie-view.scss';
import MovieCard from '../movie-card/movie-card';

//showing details once MovieCard is clicked
class MovieView extends React.Component {
  constructor() {
    super();
    //initial state for main-view
    this.state = {
      gettingReco: null,
      recommended: null,
    };
    this.showRecos = this.showRecos.bind(this);
  }

  getRecos(movie) {
    if (movie.Recommended.length > 0) {
      this.showRecos({
        exist: movie.Recommended,
      });
      return;
    }
    let accessToken = localStorage.getItem('token');
    axios
      .get(
        `https://marinanadj-53303.herokuapp.com/recommended/${this.props.movie.odbID}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        this.showRecos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  showRecos(recommended) {
    if (!recommended) return;

    let processedTV = [];
    let existDetails = [];

    if (recommended.exist && recommended.exist.length > 0) {
      existDetails = this.props.movies.filter((m) => {
        if (recommended.exist.includes(m.odbID)) {
          return m;
        }
      });
    }
    if (recommended.processedTV && recommended.processedTV.length > 0) {
      processedTV = [...recommended.processedTV];
    }

    this.setState({
      recommended: [...existDetails, ...processedTV],
    });
  }

  //resetting window to top for component
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleOnItemClick = (param) => (e) => {
    const { history } = withRouter;
    this.setState({
      recommended: null,
    });
    this.props.history.push(`/movies/${param}`);
  };

  render() {
    const { movie, onBackClick, movies } = this.props;
    const { recommended, gettingReco } = this.state;

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
              <Link to={`/genres/${movie.Genre.Name}`} className="movie-opt">
                {movie.Genre.Name ? (
                  <Button variant="secondary">More {movie.Genre.Name}</Button>
                ) : (
                  <Button disabled variant="secondary">
                    More from this Genre
                  </Button>
                )}
              </Link>
              <Button
                className="reco-button"
                variant="secondary"
                onClick={() => this.getRecos(movie)}
              >
                More Shows Like This
              </Button>
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

        {recommended && recommended.length > 0 && (
          <div className="recommended-wrap">
            <h3>Shows Similar to {movie.Title}</h3>
          </div>
        )}
        {recommended && recommended.length === 0 && (
          <div className="recommended-wrap">
            <h3>Sorry! Nothing to Recommened...</h3>
          </div>
        )}
        <Row>
          {recommended &&
            recommended.length > 0 &&
            recommended.map((m) => (
              <Col md={4} key={m._id}>
                <MovieCard
                  movie={m}
                  onMovieClick={() => this.handleOnItemClick(m._id)}
                />
              </Col>
            ))}
          {/* {recommended &&
            recommended.length > 0 &&
            recommended.map((m) => <RecommendedView key={m._id} movie={m} />)} */}
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

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    setMovies,
  })(MovieView)
);

// export default connect(mapStateToProps, {
//   setMovies,
// })(MovieView);