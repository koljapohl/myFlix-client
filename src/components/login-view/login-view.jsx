import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Form, Button } from 'react-bootstrap/';

import './login-view.scss';

export function LoginView( props ) {
  const [username, setUsername] = useState( '' );
  const [password, setPassword] = useState( '' );

  const handleSubmit = ( e ) => {
    e.preventDefault();
    console.log( username, password );
    /* send request to the server for authentication */
    props.onLoggedIn( username );
  };

  /* switches to registration form for new users */
  const handleRegistration = ( e ) => {
    e.preventDefault();
    props.onRegistration( true );
  };

  return (
    <React.Fragment>
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
            <Row className="my-4">
              <Col>
                <Button
                  block
                  variant="primary"
                  type="submit"
                  onClick={handleSubmit}>
                  Log In
              </Button>
              </Col>
            </Row>
            <Form.Row size="lg" className="my-2">
              <Form.Label className="pl-1 m-0">New to myFlix?</Form.Label>
              <Button className="py-0" variant="link" type="link" onClick={handleRegistration}>
                Sign up here</Button>
            </Form.Row>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  onRegistration: PropTypes.func.isRequired
};