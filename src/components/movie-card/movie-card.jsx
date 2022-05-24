import React from 'react';

import axios from 'axios';

import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import heartEmpty from '../../img/heart-empty.png';
import heartFull from '../../img/heart-full.png';

//importing stylesheet
import './movie-card.scss';

//Basic display of movies that are rendered on MainView
export class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieId: '',
      favoriteMovies: [],
      favorited: '',
    };
  }

  addFavMovie(mid) {
    const userName = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .post(
        `https://whatdoiwatch.herokuapp.com/users/${userName}/favorites/${mid}`,
        '',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        this.setState({
          favoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeFavMovie(mid) {
    const userName = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .delete(
        `https://whatdoiwatch.herokuapp.com/users/${userName}/favorites/${mid}`,

        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        this.setState({
          favoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  favMovieClick(e) {
    e.preventDefault();
    if (this.state.favorited) {
      this.setState({
        favorited: false,
      });
      this.removeFavMovie(this.state.movieId);
      this.props.updateFavorites(this.state.movieId);
    } else {
      this.setState({
        favorited: true,
      });
      this.addFavMovie(this.state.movieId);
      this.props.updateFavorites(this.state.movieId);
    }
  }

  favMovieHandle(fav) {
    if (fav) {
      return heartFull;
    } else {
      return heartEmpty;
    }
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.setState({
      favorited: this.props.isFavorite,
      movieId: this.props.movie._id,
      favoriteMovies: this.props.favorites,
    });
  }

  render() {
    const { movie, isFavorite, favorites } = this.props;
    return (
      <Card className="h-100 mcard">
        <div className="poster-wrapper">
          <Card.Img
            crossOrigin="anonymous"
            variant="top"
            src={movie.ImagePath}
            className="poster-img"
          />
        </div>

        <a href="#" onClick={(e) => this.favMovieClick(e)}>
          <img
            src={this.favMovieHandle(this.state.favorited)}
            className="fav-icon"
            alt="cam"
          />
        </a>

        <Card.Body className="d-flex flex-column">
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Genre.Name}</Card.Text>
          <Link className="mt-auto mov-link" to={`/movies/${movie._id}`}>
            <Button className="mov-button" variant="secondary">
              Open
            </Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

//setting up default values for the MovieCard properties
//ensuring values are strings and required
MovieCard.propTypes = {
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
};