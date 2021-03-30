import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import MainView from './components/main-view/main-view';
import moviesApp from './reducers/reducers';

//Import statement to indicate that './index.scss' needs to be bundled
//import '../node_modules/normalize.css/normalize.css';
import './index.scss';

const store = createStore( moviesApp, devToolsEnhancer() );

class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container fluid>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// find root for the app
const container = document.getElementById( 'app-container' );

// tell React to render the app in the root DOM element
ReactDOM.render( React.createElement( MyFlixApplication ), container );