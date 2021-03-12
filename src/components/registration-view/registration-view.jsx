import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button, Navbar } from 'react-bootstrap';
import axios from 'axios';

import './registration-view.scss';

export function RegistrationView( props ) {
  const [username, setUsername] = useState( '' );
  const [password, setPassword] = useState( '' );
  const [email, setEmail] = useState( '' );
  const [birthday, setBirthday] = useState( '' );

  /* handles successful registration*/
  const handleRegister = ( e ) => {
    e.preventDefault();
    axios.post( 'https://myflix-kp.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    } )
      .then( response => {
        const data = response.data;
        console.log( data );
        window.open( '/', '_self' );
      } )
      .catch( e => {
        console.log( 'error registering the user' );
        console.error( e );
      } );
  };

  /* handle an abortion of registration process*/
  const swapView = ( e ) => {
    e.preventDefault();
    window.open( '/login', '_self' );
  }

  return (
    <React.Fragment>
      <Row className="justify-content-center px-5">
        <Col className="">
          <h3 className="my-5">Register for myFlix</h3>
          <Row md={2} className="justify-content-center">
            <Col>
              <Form onSubmit={handleRegister}>
                <Form.Group as={Row} controlId="formUsername">
                  <Form.Label column sm={2} md={3}>Username</Form.Label>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      name='username'
                      value={username}
                      required
                      onChange={e => setUsername( e.target.value )}
                      pattern='[a-zA-Z\d]{5,}'
                    />
                    <Form.Control.Feedback type="invalid">
                      A Username is required and must at least contain 5 characters.
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPassword">
                  <Form.Label column sm={2} md={3}>Password</Form.Label>
                  <Col>
                    <Form.Control
                      type="password"
                      value={password}
                      placeholder="Password"
                      name="password"
                      required
                      onChange={e => setPassword( e.target.value )}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formEmail">
                  <Form.Label column sm={2} md={3}>Email</Form.Label>
                  <Col>
                    <Form.Control
                      type="email"
                      value={email}
                      placeholder="Email"
                      name="email"
                      required
                      onChange={e => setEmail( e.target.value )}
                      pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formBirth">
                  <Form.Label column sm={2} md={3}>Birthday</Form.Label>
                  <Col>
                    <Form.Control
                      type="date"
                      value={birthday}
                      placeholder="Birthday"
                      name="birthday"
                      onChange={e => setBirthday( e.target.value )}
                    />
                  </Col>
                </Form.Group>
                <Row className="my-4">
                  <Col className="btn-col">
                    <Button
                      variant="primary"
                      type="submit">
                      Register
                    </Button>
                    <Button
                      variant="link"
                      type="submit"
                      onClick={swapView}>
                      Abort
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  )
}

RegistrationView.propTypes = {
};