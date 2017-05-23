# nodebb

This application is intended to show good practices when building Single Page Applications with Backbone and node. It is used for educational purposes. It enforces several principles:

* Separation of concerns. This is applied to both client and server:
  * Client: Model View Presenter
  * Server: Multi-tier architecture
* Low coupling: each component of the application is designed to be reused

The technologies used are:

* Express.js 4
* Sequelize 3
* Webpack 2
* Backbone 1.3
* Bootstrap 3

To run the application:

- Execute `npm install` at the root of the project
- Execute `npm install` inside the `public` folder
- Execute `npm run webpack` inside the `public` folder
- Execute `node server.js` at the root of the project
- Load `http://localhost:8080`

Remember that everytime that you change any javascript file inside the `public` folder, you have to run `npm run webpack` to regenerate the file `main.min.js` and see the changes

### The App

This is a very simple application that managed two entities:

* Users
* Orders

And Order belongs to a user, and a user can own multiple orders

![USer Order relationship](https://raw.githubusercontent.com/neich/nodebb/master/images/user_order.png)

## Architecture

### Server

### Client

The server only does two things:

* Serve a REST API
* Serve static files (Single Page Application)



