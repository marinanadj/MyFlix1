import React, { Component, useState } from 'react';
import {Form, Button, Row, Col } from 'react-bootstrap';

import './login-view.scss';


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ user, setUser ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication, then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };


  return (
    <>
   <Row className="d-flex justify-content-evenly">
   <Col></Col>
   <Col xs={4} className="right_side">
     <Form className="d-flex flex-column justify-content-between align-items-center p-2 mt-4"> 
         <Form.Group controlId="formUsername" className="mt-3">
             <Form.Label>Username:</Form.Label>
             <Form.Control type="text" onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
         </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
             <Form.Label>Password:</Form.Label>
             <Form.Control type="password" placeholder="Password" value={password} 
                onChange={e => setPassword(e.target.value)}/>
          </Form.Group>

           <Button variant="primary" type="submit" onClick={handleSubmit} className="mt-4">
              Submit
           </Button>
     </Form>
   </Col>
   
   <Col xs={6} className="left_side d-flex flex-column justify-content-center align-items-center p-2 mt-4">
     <p>Please enter your details to login into the application.</p>
    
   </Col>
   <Col></Col>
  </Row>
  </>
)
}