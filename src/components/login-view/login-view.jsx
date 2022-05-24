import React, { useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

import '../../index.scss';
import './login-view.scss';

//login for user - taking username and password
export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  //validation of registration data
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be more than 2 characters');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters');
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //calling validation on user input
    const isReq = validate();

    if (isReq) {
      //sending post request to API with Username and Password
      axios
        .post('https://whatdoiwatch.herokuapp.com/login', {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((e) => {
          console.log('User does not exist');
        });
    }
  };

  // const handleRegister = (e) => {
  //   e.preventDefault();
  //   props.onRegister(true);
  // };

  return (
    <Form className="login-form d-flex justify-content-md-center flex-column align-items-center">
      <div>
        <h1>What Do I Watch!</h1>
      </div>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        {usernameErr && <p>{usernameErr}</p>}
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordErr && <p>{passwordErr}</p>}
      </Form.Group>
      <Row className="buttons flex-column">
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Sign In
        </Button>
        <Link className="reg-button" to={`/register`}>
          <Button variant="primary">Register</Button>
        </Link>
      </Row>
    </Form>
  );
}