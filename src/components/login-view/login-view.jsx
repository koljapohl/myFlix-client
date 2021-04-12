import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Form, Button, Container } from 'react-bootstrap/';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setUser, togglePw } from '../../actions/actions';
import './login-view.scss';

const mapStateToProps = state => {
  const { user, tglpw } = state;
  return { user, tglpw };
}

function LoginView( props ) {
  //if a user just registered, he'll be send to login for entering password so myFlix will obtain its jwt properly,
  //therefore its username will be displayed inside corresponding input field
  const { user, tglpw } = props;

  const handleSubmit = ( e ) => {
    e.preventDefault();
    let error = document.querySelector( '.error-message' );
    if ( error ) {
      let container = document.querySelector( '.btn-login' ).parentElement;
      let note = document.createElement( 'div' );
      note.classList.add( 'note-message' );
      note.innerText = `No login possible due to form errors. \rPlease rectify your inputs.`;
      container.appendChild( note );
      setTimeout( function () { container.removeChild( note ) }, 4000 );
      return false;
    } else {
      console.log( user.Username, user.Password );
      /* send request to the server for authentication */
      axios.post( 'https://myflix-kp.herokuapp.com/login', {},
        {
          params: {
            Username: user.Username,
            Password: user.Password
          }
        } )
        .then( response => {
          const data = response.data;
          props.onLoggedIn( data );
        } )
        .catch( e => {
          console.error( 'no such user' );
        } );
      return true;
    }
  };

  useEffect( () => {
    let usernameInput = document.querySelector( '#formUsername' );
    let passwordInput = document.querySelector( '#formPassword' );

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
  } );

  const changeState = () => {
    var oldState = tglpw.type;
    var isTextOrHide = ( oldState === 'password' );
    var newState = ( isTextOrHide ) ? 'text' : 'password';
    var newWord = ( isTextOrHide ) ? 'Hide' : 'Show';
    props.togglePw( { type: newState, word: newWord } );
  }

  return (
    <Container fluid className="login-view pb-5">
      <Row className="justify-content-center px-5">
        <Col className="">
          <h3 className="my-5">Log in to myFlix</h3>
          <Row md={2} className="justify-content-center">
            <Col>
              <Form noValidate className="login-form" onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="formUsername">
                  <Form.Label className="form-label-login" column sm={2} md={3}>Username*</Form.Label>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      name='username'
                      value={user.Username}
                      required
                      className="form-control-login"
                      onChange={e => props.setUser( { ...user, Username: e.target.value } )}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPassword">
                  <Form.Label className="form-label-login" column sm={2} md={3}>Password*</Form.Label>
                  <Col>
                    <Form.Control
                      type={tglpw.type}
                      value={user.Password}
                      placeholder="Password"
                      name="password"
                      className="form-control-login"
                      onChange={e => props.setUser( { ...user, Password: e.target.value } )}
                    />
                    <span className="password-trigger" onClick={changeState}>{tglpw.word}</span>
                  </Col>
                </Form.Group>
                <Row className="my-4">
                  <Col>
                    <Button
                      block
                      className="btn-login"
                      variant="primary"
                      type="submit"
                    >Log In</Button>
                  </Col>
                </Row>
                <Form.Row size="lg" className="my-2">
                  <Form.Label className="pl-1 m-0">New to myFlix?</Form.Label>
                  <Link to='/register'>
                    <Button className="py-0" variant="link" type="link">
                      Sign up here</Button></Link>
                </Form.Row>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default connect( mapStateToProps, { setUser, togglePw } )( LoginView );

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  user: PropTypes.shape( {
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string,
    Dob: PropTypes.Date
  } ),
  tglpw: PropTypes.shape( {
    type: PropTypes.string,
    word: PropTypes.string
  } ),
  togglePw: PropTypes.func.isRequired
};