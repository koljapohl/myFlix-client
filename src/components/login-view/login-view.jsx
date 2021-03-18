import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Form, Button } from 'react-bootstrap/';
import axios from 'axios';

import './login-view.scss';

export function LoginView( props ) {
  //if a user just registered, he'll be send to login for entering password so myFlix will obtain its jwt properly,
  //therefore its username will be displayed inside corresponding input field
  const [username, setUsername] = useState( localStorage.getItem( 'username' ) ? localStorage.getItem( 'username' ) : '' );
  const [password, setPassword] = useState( '' );

  const handleSubmit = ( e ) => {
    e.preventDefault();
    console.log( username, password );
    /* send request to the server for authentication */
    axios.post( 'https://myflix-kp.herokuapp.com/login', {},
      {
        params: {
          Username: username,
          Password: password
        }
      } )
      .then( response => {
        const data = response.data;
        props.onLoggedIn( data );
      } )
      .catch( e => {
        console.error( 'no such user' );
      } );
  };

  /* switches to registration form for new users */
  const swapView = ( e ) => {
    e.preventDefault();
    window.open( `/register`, "_self" );
  }

  return (
    <React.Fragment>
      <Row className="justify-content-center px-5">
        <Col className="">
          <h3 className="my-5">Log in to myFlix</h3>
          <Row md={2} className="justify-content-center">
            <Col>
              <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="formUsername">
                  <Form.Label className="form-label-login" column sm={2} md={3}>Username</Form.Label>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      name='username'
                      value={username}
                      required
                      className="form-control-login"
                      onChange={e => setUsername( e.target.value )}
                      pattern='[a-zA-Z\d]{5,}'
                    />
                    <Form.Control.Feedback type="invalid">
                      A Username is required and must at least contain 5 characters.
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPassword">
                  <Form.Label className="form-label-login" column sm={2} md={3}>Password</Form.Label>
                  <Col>
                    <Form.Control
                      type="password"
                      value={password}
                      placeholder="Password"
                      name="password"
                      required
                      className="form-control-login"
                      onChange={e => setPassword( e.target.value )}
                    />
                    <Form.Control.Feedback type="invalid">
                      Password is required.
                </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Row className="my-4">
                  <Col>
                    <Button
                      block
                      variant="primary"
                      type="submit"
                    >Log In</Button>
                  </Col>
                </Row>
                <Form.Row size="lg" className="my-2">
                  <Form.Label className="pl-1 m-0">New to myFlix?</Form.Label>
                  <Button className="py-0" variant="link" type="link" onClick={swapView}>
                    Sign up here</Button>
                </Form.Row>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment >
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};