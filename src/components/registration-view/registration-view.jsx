import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

import './registration-view.scss';

export function RegistrationView( props ) {
  const [username, setUsername] = useState( '' );
  const [password, setPassword] = useState( '' );
  const [email, setEmail] = useState( '' );
  const [birthday, setBirthday] = useState( '1970-01-01' );
  const [type, setType] = useState( 'password' );
  const [word, setWord] = useState( 'Show' );

  /* handles successful registration*/
  const handleRegister = ( e ) => {
    e.preventDefault();

    let error = document.querySelector( '.error-message' );
    if ( error ) {
      let container = document.querySelector( '.btn-register' ).parentElement;
      let note = document.createElement( 'div' );
      note.classList.add( 'note-message' );
      note.innerText = `No registration possible due to form errors. \rPlease rectify your inputs.`;
      container.appendChild( note );
      setTimeout( function () { container.removeChild( note ) }, 4000 );
      return false;
    } else {

      axios.post( 'https://myflix-kp.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      } )
        .then( response => {
          const data = response.data;
          console.log( data );
          props.onRegistration( username );
          window.open( '/', '_self' );
        } )
        .catch( e => {
          console.log( 'error registering the user' );
          console.error( e );
        } );
      return true;
    }
  };

  useEffect( () => {
    let usernameInput = document.querySelector( '#formUsername' );
    let passwordInput = document.querySelector( '#formPassword' );
    let emailInput = document.querySelector( '#formEmail' );
    let dobInput = document.querySelector( '#formBirth' );

    function validateUsername() {
      let value = usernameInput.value;
      let reg = /\w{5,}/;
      if ( !value ) {
        showErrorMessage( usernameInput, 'Username is required.' );
        return false;
      }
      if ( !reg.test( value ) ) {
        showErrorMessage( usernameInput, 'Username must contain at least 5 alphanumeric characters.' );
        return false;
      }
      showErrorMessage( usernameInput, null );
      return true;
    }
    function validatePassword() {
      let value = passwordInput.value;
      if ( !value ) {
        showErrorMessage( passwordInput, 'Please provide your password.' );
        return false;
      }
      showErrorMessage( passwordInput, null );
      return true;
    }
    function validateEmail() {
      let value = emailInput.value;
      let reg = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      if ( !value ) {
        showErrorMessage( emailInput, 'Email is required.' );
        return false;
      }
      if ( !reg.test( value ) ) {
        showErrorMessage( emailInput, 'Invalid mail pattern.' );
        return false;
      }
      showErrorMessage( emailInput, null );
      return true;
    }
    function validateDob() {
      let value = dobInput.value;

      if ( !value instanceof Date ) {
        showErrorMessage( dobInput, 'Please enter a valid date.' );
        return false;
      }
      showErrorMessage( dobInput, null );
      return true;
    }

    function showErrorMessage( input, message ) {
      let container = input.parentElement;
      let error = container.querySelector( '.error-message' );
      if ( error ) {
        container.removeChild( error );
      }
      if ( message ) {
        let error = document.createElement( 'div' );
        error.classList.add( 'error-message' );
        error.innerText = message;
        container.appendChild( error );
      }
    }
    usernameInput.oninput = validateUsername;
    passwordInput.oninput = validatePassword;
    emailInput.oninput = validateEmail;
    dobInput.onchange = validateDob;
  } );

  /* handle an abortion of registration process*/
  const swapView = ( e ) => {
    e.preventDefault();
    window.open( '/', '_self' );
  }

  //toggle pw visibility
  const changeState = () => {
    var oldState = type;
    var isTextOrHide = ( oldState === 'password' );
    var newState = ( isTextOrHide ) ? 'text' : 'password';
    var newWord = ( isTextOrHide ) ? 'Hide' : 'Show';
    setType( newState );
    setWord( newWord );
  }

  return (
    <React.Fragment>
      <Row className="justify-content-center px-5">
        <Col className="">
          <h3 className="my-5">Register for myFlix</h3>
          <Row md={2} className="justify-content-center">
            <Col>
              <Form noValidate onSubmit={handleRegister}>
                <Form.Group as={Row} controlId="formUsername">
                  <Form.Label column sm={2} md={3}>Username*</Form.Label>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      name='username'
                      className="form-control-register"
                      value={username}
                      onChange={e => setUsername( e.target.value )}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPassword">
                  <Form.Label column sm={2} md={3}>Password*</Form.Label>
                  <Col>
                    <Form.Control
                      type={type}
                      value={password}
                      placeholder="Password"
                      name="password"
                      className="form-control-register"
                      onChange={e => setPassword( e.target.value )}
                    />
                    <span className="password-trigger" onClick={changeState}>{word}</span>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formEmail">
                  <Form.Label column sm={2} md={3}>Email*</Form.Label>
                  <Col>
                    <Form.Control
                      type="email"
                      value={email}
                      placeholder="Email"
                      name="email"
                      className="form-control-register"
                      onChange={e => setEmail( e.target.value )}
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
                      className="form-control-register"
                      onChange={e => setBirthday( e.target.value )}
                    />
                  </Col>
                </Form.Group>
                <span className="required-inputs">fields marked with "*" are required</span>
                <Row className="my-4">
                  <Col className="btn-col">
                    <Button
                      className="btn-register"
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