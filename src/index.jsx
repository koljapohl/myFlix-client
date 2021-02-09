import React from 'react';
import ReactDOM from 'react-dom';

//Import statement to indicate that './index.scss' needs to be bundled
import './index.scss';

class MyFlixApplication extends React.Component {
  render() {
    return (
      <div className="my-flix">
        <div>Good morning</div>
      </div>
    );
  }
}

// find root for the app
const container = document.getElementsByClassName( 'app-container' )[0];

// tell React to render the app in the root DOM element
ReactDOM.render( React.createElement( MyFlixApplication ), container );