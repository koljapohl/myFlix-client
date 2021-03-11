import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button } from 'react-bootstrap';

import './registration-view.scss';

export function RegistrationView( props ) {
  const [username, setUsername] = useState( '' );
  const [password, setPassword] = useState( '' );
  const [email, setEmail] = useState( '' );
  const [birth, setBirth] = useState( '' );

  //Implement form-validation at a later point!!

  /* handles successful registration*/
  const handleRegistration = ( e ) => {
    e.preventDefault();

    /* logs in the newly registered user*/
    props.onLoggedIn( username );
    /* end registration process */
    props.onRegistration( false );
  };
  /* handle an abortion of registration process*/
  const handleAbort = ( e ) => {
    e.preventDefault();
    /* end registration process */
    props.onRegistration( false );
  }

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
                  onClick={handleRegistration}>
                  Register
                </Button>
                <Button variant="link" type="submit" onClick={handleAbort}>Abort</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  )
}

RegistrationView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  onRegistration: PropTypes.func.isRequired
};