# React Boilerplate
A super simple quick start react project template.

## Contains
- Editor configuration
- JavaScript Linting based on AirBnb
  - eslint
  - eslint-plugin-react
  - AirBnb dependencies
- JavaScript transpiling with
  - webpack
  - Babel
- JavaScript polyfills
  - Babel
- Build pipelines
  - Basic development (watch & auto-compile) and release (package) scripts

### Doesn't include
- React data modelling (e.g. Redux)
- React-Router
- Complex release workflows (e.g. compile, clean, copy etc)


## Setup
#### Install packages
``npm run install``

## Run
For a SPA that has routing configure server to redirect all domain request paths to the domain route so that the application will capture the request.
This is most relevant for SPAs that incorporate **routing**

### IIS server
- Create a new website with the 'physical path' pointing at the 'development' folder
- Name website e.g. 'mysite'
- Add a host file entry ``127.0.0.1 mysite``

You can now load the site via the name given e.g. **http://mysite**

##### Development
To run an initial development build & start watching and autocompiling when files change
- ``npm run dev.start.iis'

### UNIX server
Configured via node as part of a build task which sets up a simple express server that handles the auto redirection. This is run as a default part of the development environment.
- ``npm run dev.start.unix``
