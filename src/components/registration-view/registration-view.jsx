import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './registration-view.scss';

//user registration form taking necessary user details
export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  //validation of registration data
  const validate = () => {
    setEmailErr(''), setPasswordErr(''), setUsernameErr('');
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr('Username must be more than 5 characters');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters');
      isReq = false;
    }
    if (!validateEmail(email)) {
      setEmailErr('Must use a valid Email Address');
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isReq = validate();

    if (isReq) {
      axios
        .post('https://marinanadj-53303.herokuapp.com/users', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const date = response.data;
          alert('Success! - please log in');
          window.open('/', '_self');
        })
        .catch((error) => {
          console.log(error);
          alert('unable to register');
        });
    }
  };

  return (
    <Form className="reg-form d-flex justify-content-md-center flex-column align-items-center">
      <div className="register-title">
        <h1>Register new acount</h1>
      </div>
      <Form.Group controlId="regUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        {usernameErr && <p>{usernameErr}</p>}
      </Form.Group>
      <Form.Group controlId="regPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordErr && <p>{passwordErr}</p>}
      </Form.Group>
      <Form.Group controlId="regEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} />
        {emailErr && <p>{emailErr}</p>}
      </Form.Group>
      <Form.Group controlId="regBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>
      <Button
        className="register-button"
        variant="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }),
};