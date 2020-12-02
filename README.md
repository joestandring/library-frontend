# Book Lending SPA Frontend
An SPA frontend for a book lending service using React
Uses [Book Lending API Backend](https://github.coventry.ac.uk/304CEM-2021SEPJAN/standringj-backend)
This document contains information for installing, setting up, and configuring the frontend SPA. To generate documention for code, you can use JSDocs with ```npm run docs```
## Installing
Clone the repository:
```
$ git clone https://github.coventry.ac.uk/304CEM-2021SEPJAN/standringj-backend.git
```
Install the package:
```
$ cd standringj-backend
$ npm install
```
## API configuration
To interface with the API, you must define its FULL URI and in ```src/apiconf.js```. For example:
```
const ApiConf = {
  // Hostname + port(optional)
  host: 'https://myapi.com/api/v1'
}
```
## Running the app
To run the database, you can use the ```start``` script to run the server with ```react-scripts start```. This means that the app will update when any files are changed:
```
$ npm start
```
You can then access the app at http://localhost:3000/
## Documentation
To generate documentation using JSDoc, use:
```
$ npm run docs
```
Documentation will then be available in the ```docs/``` directory