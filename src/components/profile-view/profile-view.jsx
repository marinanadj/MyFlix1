import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import moviecard from '../movie-card/movie-card';

import axios from 'axios';

import './profile-view.scss';

import { Form, Col, Row, Button, Modal } from 'react-bootstrap';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
      birthday: '',
      usernameErr: '',
      passwordErr: '',
      emailErr: '',
      editAccount: false,
      deleteConfirm: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  //asking database for pofile information
  getUser(token) {
    let user = localStorage.getItem('user');
    axios
      .get(`https://marinanadj-53303.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          username: response.data.Username,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch((e) => console.log(e));
  }

  //logging user out
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/', '_self');
  }

  //formatting date to MM/DD/YYY for display on form
  getFormattedDate(date) {
    return `${date.substr(5, 2)}/${date.substr(8, 2)}/${date.substr(0, 4)}`;
  }

  //identifting if email address is valid before updating
  validateEmail(email) {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  //validating new user account info to clean up inputes
  validate() {
    let isReq = true;
    if (!this.state.username) {
      this.setErr('usernameErr', 'Username Required');
      isReq = false;
    } else if (this.state.username.length < 2) {
      this.setErr('usernameErr', 'Username must be more than 2 characters');
      isReq = false;
    } else {
      this.setErr('usernameErr', '');
    }
    if (this.state.password && this.state.password.length < 6) {
      this.setErr('passwordErr', 'Password must be at least 6 characters');
      isReq = false;
    } else {
      this.setErr('passwordErr', '');
    }
    if (this.state.email && !this.validateEmail(this.state.email)) {
      this.setErr('emailErr', ' Must use a valid Email Address');
      isReq = false;
    } else {
      this.setErr('emailErr', '');
    }

    return isReq;
  }

  handleOnItemClick = (param) => (e) => {
    this.props.history.push(`/movies/${param}`);
  };

  //takes users favorite movie ids and find them in the full set of movies
  //for display
  listFavorites = (favorites) => {
    let favoriteCards = this.props.movies
      .filter((m) => favorites.includes(m._id))
      .map((m) => (
        <Col md={4} key={m._id}>
          {/* <Link to={`/movies/${m._id}`} className="movie-opt"> */}
          <MovieCard
            movie={m}
            onMovieClick={() => this.handleOnItemClick(m._id)}
          />
          {/* </Link> */}
        </Col>
      ));
    return favoriteCards;
  };

  //toggling delete state to display the modal to confim
  deleteConfirmSetState = () => {
    this.setState({
      deleteConfirm: !this.state.deleteConfirm,
    });
  };

  //shows a modal to confirm account deletion
  deleteConfirm = () => {
    return (
      <Modal
        show="true"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirm Deletion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete? All data will be permanently
            lost...
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.deleteConfirmSetState}>
            Cancel
          </Button>
          <Button variant="danger" onClick={this.handleDeleteProfile}>
            DELETE
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  //methods for updating user info state during editing
  setUsername(value) {
    this.setState({
      username: value,
    });
  }

  setPassword(value) {
    this.setState({
      password: value,
    });
  }

  setEmail(value) {
    this.setState({
      email: value,
    });
  }

  setBirthday(value) {
    this.setState({
      birthday: value,
    });
  }

  //end user state updates

  //trying to set validation errors
  setErr(typeErr, value) {
    this.setState({ ...this.state, [typeErr]: value });
  }

  //allowing user to toggle editing their user account info
  handleEdit = () => {
    console.log(this.state.editAccount);
    if (this.state.editAccount) {
      this.setState({
        editAccount: false,
      });
    } else {
      this.setState({
        editAccount: true,
      });
    }
  };

  //posting user updates to database
  handleSubmit = (e) => {
    e.preventDefault();
    const userName = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    const isReq = this.validate();
    console.log(isReq);
    if (isReq) {
      axios
        .put(
          `https://marinanadj-53303.herokuapp.com/users/${userName}`,
          {
            Username: this.state.username,
            Password: this.state.password,
            Email: this.state.email,
            Birthday: this.state.birthday,
          },

          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          this.setState({
            username: response.data.Username,
            password: response.data.Password,
            email: response.data.Email,
            birthday: response.data.Birthday,
          });
          localStorage.setItem('user', this.state.username);
          alert('profile updated successfully!');
          window.open(`/users/${this.state.username}`, '_self');
        });
    }
  };

  //sending a delete request for user
  handleDeleteProfile() {
    const userName = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .delete(
        `https://marinanadj-53303.herokuapp.com/users/${userName}`,

        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        alert('profile deleted');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/', '_self');
      })
      .catch((e) => console.log(e));
  }

  render() {
    const { history } = this.props;
    const { username, email, birthday, usernameErr, passwordErr, emailErr } =
      this.state;

    return (
      <div className="profile-wrapper">
        <div className="movie-view tp-movie">
          {this.state.deleteConfirm && this.deleteConfirm()}

          <div className="user-info">
            <h4>User Information</h4>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>Birthday: {this.getFormattedDate(birthday)}</p>
            <Row>
              <Col md={6}>
                <Button
                  className="update-info-button"
                  variant="primary"
                  type="submit"
                  onClick={this.handleEdit}
                >
                  {/* toggling button to show edit form and close it on clicking */}
                  {this.state.editAccount ? 'Close' : 'Edit Account'}
                </Button>
              </Col>
              <Col md={6} className="text-right">
                <Button
                  className="delete-account-button"
                  variant="danger"
                  type="submit"
                  onClick={this.deleteConfirmSetState}
                >
                  Delete Account
                </Button>
              </Col>
            </Row>
          </div>
          {/* will show the user information update form once the edit is clicked */}
          {this.state.editAccount && (
            <Form
              className="d-flex justify-content-md-center flex-column align-items-center"
              onSubmit={(e) =>
                this.handleSubmit(
                  e,
                  this.Username,
                  this.Password,
                  this.Email,
                  this.Birthday
                )
              }
            >
              <div className="register-title">
                <h1>Update Your Account</h1>
              </div>
              <Form.Group controlId="regUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  name="Username"
                  onChange={(e) => this.setUsername(e.target.value)}
                />
                {usernameErr && <p>{usernameErr}</p>}
              </Form.Group>
              <Form.Group controlId="regPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="Password"
                  onChange={(e) => this.setPassword(e.target.value)}
                />
                {passwordErr && <p>{passwordErr}</p>}
              </Form.Group>
              <Form.Group controlId="regEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="Email"
                  onChange={(e) => this.setEmail(e.target.value)}
                />
                {emailErr && <p>{emailErr}</p>}
              </Form.Group>
              <Form.Group controlId="regBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  name="Birthday"
                  onChange={(e) => this.setBirthday(e.target.value)}
                />
              </Form.Group>
              <Button
                className="register-button"
                variant="primary"
                type="submit"
                onClick={this.handleSubmit}
              >
                Submit Changes
              </Button>
            </Form>
          )}
        </div>
        {/* Showing list of favorite movies */}
        <div className="movie-view bt-movie">
          <div className="cards-header">{this.state.username}'s Favorites:</div>
          <Row>{this.listFavorites(this.props.favorites)}</Row>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    favorites: state.favorites,
  };
};

export default connect(mapStateToProps)(ProfileView);

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imagePath: PropTypes.string.isRequired,
    })
  ).isRequired,
};