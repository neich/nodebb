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

## The App

This is a very simple application that managed two entities:

* Users
* Orders

And Order belongs to a user, and a user can own multiple orders

![User Order relationship](https://raw.githubusercontent.com/neich/nodebb/master/images/user_order.png)

## Architecture

### Server

The server does two things:

* Serve a REST API
* Serve static files (Single Page Application)

The server architecture follows a multi-tier approach. Specifically, the app uses 3 tiers:

* The Controller tier. Here is where HTTP requests and responses are processed. The responsabilies are: check for input parameters, authentication, response build, ... It uses Express 4.
* The DAO tier. Here is the API that implements the business logic of the app. It s a set of calls that get data as parameters, and return promises as results.
* The persistence tier. This is implemented using Sequelize 3, and it defined the persistent entities and their relationships.

### Client

The client follows the Model-View-Presenter pattern. It uses Backbone 1.3 to define views and models.

## Folder structure

Both client and server are in the same folder tree. The server app is located at the root of the project, while the client app is located inside the `public` folder.

```
|-- controllers   (functions processing API requests and responses)
|-- dao           (Data Acces Object, app API)
|-- models        (Sequelize models)
|-- routers       (Mapping URL to controllers)
|-- util          
|-- server.js     (Server entry point)
|-- package.json
|-- public                    (Client app)
    |-- fonts
    |-- js
        |-- collections       (Backbone collections)
        |-- models            (Backbone models)
        |-- presenters        (App logic)
        |-- views             (Backbone views)
        |-- app.js            (Main app)
        |-- evenBus.js        (Global event bus)
        |-- localStorage.js   
        |-- main.js           (Webpack entry point)
    |-- styles                (SCSS files)
    |-- templates             (Underscore templates)
    |-- index.html            (Static html, main app structure)
    |-- package.json
    |-- webpack.config.js

```



