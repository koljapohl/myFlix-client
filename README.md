# myFlix-client

## Project description

This project addresses the development of the client-side of the movie application myFlix. The frontend will be build by using the React framework. This will interact with the REST API that has been previously defined in a preceding project.
In the end, the whole application will follow the MERN tech stack.

## setting up parcel

in the command prompt type:

`npm install -g parcel-bundler`

within app-folder create a "package.json" file with an empty JSON object: {}.

installing necessary dependencies in client-folder:

`npm install --save react-dom`

`npm install --save-dev babel-preset-react babel-preset-env`

`npm install --save-dev babel-plugin-transform-class-properties`

Afterwards, need to configure babel by telling what type of transpilation to perform.

Add ".babelrc" file into client-folder.

inside this file add:

`{
  
   "presets": ["env", "react"],

   "plugins": ["transform-class-properties"]

 }`

for building and running application use *index.html* as entry point for parcel

within Terminal, type:

`npm start` to run the build process

app will be run on: `localhost:1234`

## Dependencies

+ React
+ ReactDOM
+ React-Bootstrap
+ Axios
+ PropTypes
+ Redux

### dev-Dependencies

+ Babel
+ Sass

## API

This project connects to this [movie API](https://github.com/koljapohl/movie_api)