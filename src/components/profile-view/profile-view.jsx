import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Nav, Navbar, Container, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';

import arrow from '../../../public/img/arrow.svg';
import logout from '../../../public/img/log-out.svg';
import './profile-view.scss';
import _default from 'react-bootstrap/esm/Toast';

export function ProfileView( props ) {
  const [username, setUsername] = useState( props.username );
  const [password, setPassword] = useState( props.password );
  const [email, setEmail] = useState( props.email );
  const [dob, setDob] = useState( props.dob );
  let favoriteMovies = JSON.parse( localStorage.getItem( 'favoriteMovies' ) );

  let convertDob;
  if ( dob ) {
    convertDob = dob.slice( 0, 10 );
  }

  const updateUser = ( e ) => {
    e.preventDefault();
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
        props.onUpdate( response.data );
        alert( 'User has been updated successfully.' );
      } )
      .catch( error => {
        console.log( error );
      } );
  }

  const handleCancel = () => {
    setUsername( localStorage.getItem( 'username' ) );
    setPassword( localStorage.getItem( 'password' ) );
    setEmail( localStorage.getItem( 'email' ) );
    setDob( localStorage.getItem( 'dob' ) );
  }

  const onUnregister = () => {
    let user = localStorage.getItem( 'username' );
    let token = localStorage.getItem( 'token' );
    axios.delete( `https://myflix-kp.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    } )
      .then( response => {
        localStorage.clear();
        alert( `We're sorry you're leaving ${user}.` );
        window.open( '/', '_self' );
      } );
  }

  return (
    <React.Fragment>
      <Container fluid className="px-5">
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
        <Row lg={2} className="justify-content-center">
          <Col>
            <Form className="update-form" onSubmit={updateUser}>
              <Form.Group as={Row} controlId="formUsername">
                <Form.Label column sm={2} md={3}>Username</Form.Label>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Set a new Username"
                    name='inputUsername'
                    value={username}
                    onChange={e => setUsername( e.target.value )}
                    pattern='[a-zA-Z\d]{5,}'
                  />
                  <Form.Control.Feedback type="invalid">
                    A Username must at least consist of 5 characters.
                    </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPassword">
                <Form.Label column sm={2} md={3}>Password</Form.Label>
                <Col>
                  <Form.Control
                    type="password"
                    placeholder="Set a new Password"
                    name="password"
                    onChange={e => setPassword( e.target.value )}
                    pattern='.{1,}'
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formEmail">
                <Form.Label column sm={2} md={3}>Email</Form.Label>
                <Col>
                  <Form.Control
                    type="email"
                    value={email}
                    placeholder="Set a new Email adress"
                    name="email"
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
                    value={convertDob}
                    placeholder="Update your Birthday"
                    name="birthday"
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
                    type="submit">
                    Update
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
      </Container>
    </React.Fragment>
  )
}

ProfileView.propTypes = {
  favoriteMovies: PropTypes.arrayOf(
    PropTypes.shape( {
      ObjectId: PropTypes.string.isRequired
    } )
  ),
  username: PropTypes.string.isRequired,
  password: PropTypes.string,
  email: PropTypes.string.isRequired,
  dob: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
}