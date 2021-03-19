import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Nav, Navbar, Container, Form, Spinner, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import arrow from '../../../public/img/arrow.svg';
import logout from '../../../public/img/log-out.svg';
import './profile-view.scss';

export function ProfileView( props ) {
  const [username, setUsername] = useState( localStorage.getItem( 'username' ) );
  const [password, setPassword] = useState( localStorage.getItem( 'password' ) );
  const [email, setEmail] = useState( localStorage.getItem( 'email' ) );
  const [dob, setDob] = useState( localStorage.getItem( 'dob' ) );
  const [favoriteMovies, setFavoriteMovies] = useState( JSON.parse( localStorage.getItem( 'favoriteMovies' ) ) );
  const [type, setType] = useState( 'password' );
  const [word, setWord] = useState( 'Show' );
  // convert birthday to common format
  let convertDob;
  if ( dob ) {
    convertDob = dob.slice( 0, 10 );
  }
  // List of current users favorite Movies
  const favoriteMovieList = props.movies.filter( movie => {
    return favoriteMovies.includes( movie._id )
  } );

  const updateUser = ( e ) => {
    e.preventDefault();

    let error = document.querySelector( '.error-message' );
    if ( error ) {
      let container = document.querySelector( '.btn-update' ).parentElement.parentElement;
      let note = document.createElement( 'div' );
      note.classList.add( 'note-message', 'note-message-update' );
      note.innerText = `No update possible due to form errors. \rPlease rectify your inputs.`;
      container.appendChild( note );
      //setTimeout( function () { container.removeChild( note ) }, 4000 );
      return false;
    } else {
      let token = localStorage.getItem( 'token' );
      let un = localStorage.getItem( 'username' );
      let pw = localStorage.getItem( 'password' );
      let em = localStorage.getItem( 'email' );
      let birth = localStorage.getItem( 'dob' );

      axios.put( `https://myflix-kp.herokuapp.com/users/${un}`, {
        Username: ( username == un ) ? un : username,
        Password: ( password == pw ) ? pw : password,
        Email: ( email == em ) ? em : email,
        Birthday: ( dob == birth ) ? birth : dob
      },
        {
          headers: { Authorization: `Bearer ${token}` }
        } )
        .then( response => {
          const data = response.data;
          props.onUpdate( data );
          setUsername( data.Username );
          setPassword( data.Password );
          setEmail( data.Email );
          setDob( data.Birthday );
          alert( 'User has been updated successfully.' );
        } )
        .catch( error => {
          console.log( error );
        } );
    }
  }

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

  const handleCancel = () => {
    setUsername( localStorage.getItem( 'username' ) );
    setPassword( localStorage.getItem( 'password' ) );
    setEmail( localStorage.getItem( 'email' ) );
    setDob( localStorage.getItem( 'dob' ) );
  }

  const onUnregister = () => {
    let user = localStorage.getItem( 'username' );
    let token = localStorage.getItem( 'token' );
    if ( confirm( 'Are you sure you want to delete your account?' ) ) {
      axios.delete( `https://myflix-kp.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` }
      } )
        .then( response => {
          localStorage.clear();
          alert( `We're sorry you're leaving ${user}.` );
          window.open( '/', '_self' );
        } );
    }
  }

  const handleUnfav = ( mId ) => {
    let token = localStorage.getItem( 'token' );
    let user = localStorage.getItem( 'username' );
    let favList = JSON.parse( localStorage.getItem( 'favoriteMovies' ) );
    axios.delete( `https://myflix-kp.herokuapp.com/users/${user}/movies/${mId}`, {
      headers: { Authorization: `Bearer ${token}` }
    } )
      .then( () => {
        let newList = favList.filter( item => item !== mId );
        localStorage.setItem( 'favoriteMovies', JSON.stringify( newList ) );
        setFavoriteMovies( newList );
        props.onMovieDel();
      } )
      .catch( error => {
        console.error( error );
      } );
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
      <Container fluid className="px-5 justify-content-center">
        <Navbar sticky="top" className="p-0 mb-2">
          <Navbar.Brand className="brand" href="/">myFlix</Navbar.Brand>
          <Nav className="ml-auto button-wrapper">
            <Link to={'/'}>
              <Button
                type="button"
                variant="primary"
                className="mx-2">
                All movies
              </Button>
            </Link>
            <Button className="btn-logout"
              variant="link"
              type="button"
              onClick={() => props.onLogout()}>
              <img className="logout" src={logout} alt="logout icon" />
            </Button>
          </Nav>
        </Navbar>

        <Row className="mb-5">
          <Col xs="auto">
            <Link to={"/"} className="btn-back px-0">
              <img className="arrow" src={arrow} alt="back icon" />
            </Link>
          </Col>
          <Col>
            <h1 className="brand my-auto">Profile</h1>
          </Col>
        </Row>
        <Row lg={2} className="">
          <Col xs={8}>
            <Form noValidate className="update-form" onSubmit={updateUser}>
              <Form.Group as={Row} controlId="formUsername">
                <Form.Label className="form-label-profile" column md={3}>Username</Form.Label>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Set a new Username"
                    name='inputUsername'
                    value={username}
                    className="form-control-profile"
                    onChange={e => setUsername( e.target.value )}
                    pattern='[a-zA-Z\d]{5,}'
                  />
                  <Form.Control.Feedback type="invalid">
                    A Username must at least consist of 5 characters.
                    </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPassword">
                <Form.Label className="form-label-profile" column md={3}>Password</Form.Label>
                <Col>
                  <Form.Control
                    type={type}
                    placeholder="Set a new Password"
                    name="password"
                    className="form-control-profile"
                    onChange={e => setPassword( e.target.value )}
                  />
                  <span className="password-trigger" onClick={changeState}>{word}</span>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formEmail">
                <Form.Label className="form-label-profile" column md={3}>Email</Form.Label>
                <Col>
                  <Form.Control
                    type="email"
                    value={email}
                    placeholder="Set a new Email adress"
                    name="email"
                    className="form-control-profile"
                    onChange={e => setEmail( e.target.value )}
                    pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="last-form-row" controlId="formBirth">
                <Form.Label className="form-label-profile" column md={3}>Birthday</Form.Label>
                <Col>
                  <Form.Control
                    type="date"
                    value={convertDob}
                    placeholder="Update your Birthday"
                    name="birthday"
                    className="form-control-profile"
                    onChange={e => setDob( e.target.value )}
                  />
                </Col>
              </Form.Group>
              <Row className="my-4">
                <Col className="btn-col">
                  <Button
                    variant="outline-primary"
                    type="button"
                    onClick={handleCancel}>
                    Cancel
                  </Button>
                </Col>
                <Col xs="auto" className="btn-col">
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn-update">
                    <div className="show" style={{ display: "inline" }}>
                      Update
                    </div>
                    <div style={{ display: "none" }}>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Loading...
                    </div>
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col>
            <Button
              variant="danger"
              type="button"
              onClick={onUnregister}>
              UNREGISTER!
            </Button>
          </Col>
        </Row>
        <h4 className="mb-4">Favorite Movies</h4>
        <Row className="favorite-movies">
          {favoriteMovieList.map( movie => (
            <Col key={movie._id} className="mb-4 ">
              <Card className="fav-card mx-auto">
                <Card.Header>
                  <Card.Title>{movie.Title}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Img variant="top" src={movie.ImagePath} />
                </Card.Body>
                <Card.Footer>
                  <Button
                    className=""
                    onClick={() => { handleUnfav( movie._id ) }}
                    variant="outline-danger"
                    type="button">
                    Remove
                    </Button>
                </Card.Footer>
              </Card>
            </Col>
          ) )}
        </Row>
      </Container>
    </React.Fragment>
  )
}

ProfileView.propTypes = {
  movies: PropTypes.array.isRequired,
  onLogout: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
}