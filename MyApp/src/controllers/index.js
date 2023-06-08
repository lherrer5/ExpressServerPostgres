// File healthCheckController.js
const healthCheckController = require('./healthCheckController');
//const { healthCheck, welcomePage } = require('./healthCheckController');

// File productsController.js
const pdtsController =require('./productsController');

// File userController.js
const usersController = require("./userController");

//File authController.js
const authController=require("./authController");

//File io.js
const io=require("./io")

module.exports = { healthCheckController, pdtsController, usersController, authController, io}