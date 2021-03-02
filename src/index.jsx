import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';

import { MainView } from './components/main-view/main-view';

//Import statement to indicate that './index.scss' needs to be bundled
import '../node_modules/normalize.css/normalize.css';
import './index.scss';

class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container fluid>
        <MainView />
      </Container>
    );
  }
}

// find root for the app
const container = document.getElementById( 'app-container' );

// tell React to render the app in the root DOM element
ReactDOM.render( React.createElement( MyFlixApplication ), container );