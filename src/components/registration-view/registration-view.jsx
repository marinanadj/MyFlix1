import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Card, Cardgroup, Container, Col, Row, CardGroup } from 'react-bootstrap';
import './registration-view.scss'

export function RegistrationView() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    // const [birthdayErr, setBirthdayErr] = useState('');

    const validate = () => {
        let isReq = true;

        if(!username){
          setUsernameErr('Username required');
          isReq = false;
        } else if(username.length < 5){
          setUsernameErr('Username must be 5 characters long');
          isReq = false;
        }
    
        if(!password){
          setPasswordErr('Password Required');
          isReq = false;
        } else if(password.length < 6){
          setPasswordErr('Password must be 6 characters long');
          isReq = false;
        }
    
        if(!email){
          setEmailErr('Email Required');
          isReq = false;
        } else if(email.indexOf('@') === -1 ){
          setEmailErr('You must enter a valid email address');
          isReq = false;
        }

        return isReq;
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            axios.post('https://marinanadj-53303.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            })
            .then(response => {
                const data = response.data;
                console.log(data);
                alert('Welcome to MyFlix! Please login.')
                //_self keeps page from opening into a new tab
                window.open('/', '_self');
            })
            .catch(response => {
                console.error(response);
                alert('Uh-oh! Something was entered incorrectly :(')
            })
        }
    }

    return (
        <Container id='registration-view-container'>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Title id='registration-view-card-title'>
                                Register here and you can use MyFlix!
                            </Card.Title>
                            <Card.Body>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>
                                            Email: 
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                            placeholder="Enter a valid email address"
                                        />
                                        {emailErr && <p>{emailErr}</p>}
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>
                                            Username: 
                                        </Form.Label>
                                            <Form.Control 
                                            type="text" 
                                            value={username} 
                                            onChange={e => setUsername(e.target.value)} required
                                            placeholder="Choose a username"
                                            />
                                        {usernameErr && <p>{usernameErr}</p>}
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>
                                            Birthday: 
                                        </Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={birthday}
                                            onChange={e => setBirthday(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>
                                            Password: 
                                        </Form.Label>
                                            <Form.Control 
                                                type="password" 
                                                value={password} 
                                                onChange={e => setPassword(e.target.value)} required
                                                placeholder="Choose a password"
                                            />
                                            {passwordErr && <p>{passwordErr}</p>}
                                    </Form.Group>
                                    <Button 
                                        id='registration-view-button' type="submit" 
                                        variant="primary" 
                                        onClick={handleSubmit}>
                                            Register
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    )
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.number.isRequired
    })
};