// // File errorH.js
// exports.errorHandler = require('./errorH');
// exports.notFoundHandler = require('./errorH');

// // File pdtSchemaValidation.js
// exports.pdtSchemaValidation = require('./pdtSchemaValidation');
// exports.updateSchemaValidation=require("./pdtSchemaValidation");

// // File userSchemaValidation.js
// exports.userSchemaValidation = require('./userSchemaValidation');
// exports.userUpdateSchemaValidation=require("./userSchemaValidation");

// //File joiIdValidator.js
// exports.joiValidationId= require('./joiIdValidator')

const errorHandler = require("./errorH");
const notFoundHandler = require("./errorH");
const pdtSchemaValidation = require("./pdtSchemaValidation");
const updateSchemaValidation = require("./pdtSchemaValidation");
const userSchemaValidation = require("./userSchemaValidation");
const userUpdateSchemaValidation = require("./userSchemaValidation");
const joiValidationId = require("./joiIdValidator");


module.exports = { errorHandler, notFoundHandler, pdtSchemaValidation,updateSchemaValidation, userSchemaValidation, userUpdateSchemaValidation,joiValidationId};