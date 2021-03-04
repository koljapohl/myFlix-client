# myFlix-client

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

`parcel src\index.html` to run the build process

app will be run on: `localhost:1234`

## Dependencies

+ React
+ ReactDOM
+ React-Bootstrap
+ Axios
+ PropTypes

### dev-Dependencies

+ Babel
+ Sass
