import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button, Navbar } from 'react-bootstrap';

import './registration-view.scss';

export function RegistrationView( props ) {
  const [username, setUsername] = useState( '' );
  const [password, setPassword] = useState( '' );
  const [email, setEmail] = useState( '' );
  const [birth, setBirth] = useState( '' );

  //Implement form-validation at a later point!!

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
    /* end registration process */
    window.open( '/login', '_self' );
  }

  return (
    <React.Fragment>
      <Row className="justify-content-center">
        <Col className="px-5">
          <Navbar className="mb-5 mt-3">
            <Navbar.Brand className="brand">Register for myFlix</Navbar.Brand>
          </Navbar>
          <Row md={2} className="justify-content-center">
            <Col>
              <Form>
                <Form.Group as={Row} controlId="formUsername">
                  <Form.Label column sm={2} md={3}>Username</Form.Label>
                  <Col>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={e => setUsername( e.target.value )}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPassword">
                  <Form.Label column sm={2} md={3}>Password</Form.Label>
                  <Col>
                    <Form.Control
                      type="password"
                      value={password}
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
                      onChange={e => setEmail( e.target.value )}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formBirth">
                  <Form.Label column sm={2} md={3}>Birthday</Form.Label>
                  <Col>
                    <Form.Control
                      type="date"
                      value={birth}
                      onChange={e => setBirth( e.target.value )}
                    />
                  </Col>
                </Form.Group>
                <Row className="my-4">
                  <Col className="btn-col">
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleRegister}>
                      Register
                </Button>
                    <Button variant="link" type="submit" onClick={swapView}>Abort</Button>
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