import React, { useState } from 'react';
import PropTypes from "prop-types";

import {Form, Button, Card, CardGroup, Container, Row, Col, Link} from 'react-bootstrap';

//user registration form 
export function RegistrationView (props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

 
  const handleRegistration = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.post(baseURL + 'users', { Username: username, Password: password, Email: email, Birthday: birthday })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("Your registration has been successfully processed. You can now proceed to login.");
          window.open("/", "_self");
          //open in the current tab
        })
        .catch((response) => {
		alert("Your registration has NOT been successfully processed. Please try again.");
		window.open("/register", "_self");			
        });
    }
  };
	return (
    <>
          <Row className="justify-content-center my-5">
 				<Col md={4}>
 				<Form>
 			<Form.Group>
 				<Form.Label>Username*</Form.Label>
 				<Form.Control 
					type="text" 
					placeholder="Username" 
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Password*</Form.Label>
				<Form.Control 
					type="password" 
					placeholder="Password" 
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					minLength="10"
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Email*</Form.Label>
				<Form.Control 
					type="email" 
					placeholder="Email" 
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Birthday</Form.Label>
				<Form.Control 
					type="date" 
					placeholder="dd-mm-yyyy" 
					onChange={(e) => setBirthday(e.target.value)}
					value={birthday}
				/>
			</Form.Group>
			<Button variant="secondary" className="my-4" type="submit" onClick={handleRegistration}>
					Submit
			</Button>
			</Form>
			</Col>
			</Row>
      </>
	)
}