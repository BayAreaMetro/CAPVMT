# capvmt

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.4.2.

## Getting Started / Web Development  

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) *Node ^4.2.3, npm ^2.14.7*

NOTE: the Node version required by this app is 4.2.3. Newer versions of node will not build the dependencies succesfully. We recommend using [NVM](https://github.com/creationix/nvm) or similar. 

- [Bower](bower.io) (`npm install --global bower`)
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)  
~~[MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`~~?
- [SQL Server 2012] - this is how the data for the application is hosted

Example local sql server config file: https://github.com/BayAreaMetro/CAPVMT/blob/master/server/config/local.env.sample.js

### Developing the Web Application. 

1. Run `npm install` to install server dependencies.

if this fails, might need to set python version: https://stackoverflow.com/questions/20454199/how-to-use-a-different-version-of-python-during-npm-install

2. Run `bower install` to install front-end dependencies.

3. Setup SQL Server connection/drivers/etc

4. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Data Updates

see the readme in the [sql folder](https://github.com/BayAreaMetro/CAPVMT/blob/Development/sql/)
