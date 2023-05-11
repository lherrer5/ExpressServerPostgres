const express = require("express");
const controller = require("../controllers/productsController");
//const { healthCheck, welcomePage } = require("../controllers/healthCheckController");
//const { healthCheckController, pdtsController} = require("../controllers");
const productsRouter = express.Router();
// const pdtoSchemaValidation=require("../middlewares/pdtSchemaValidation");
// const updateSchemaValidation=require("../middlewares/pdtSchemaValidation");
// const joiValidationId= require("../middlewares/joiIdValidator");
//const {pdtSchemaValidation, updateSchemaValidation, joiValidationId} = require("../middlewares");

//all APIs should have a health check that is a request to review that our server is working
//productsRouter.get("/", healthCheckController.welcomePage);
//productsRouter.get("/health", healthCheckController.healthCheck);
productsRouter.get("/", controller.getAllProducts);
// productsRouter.get("/api/v1/products/:id", joiValidationId, pdtsController.getProductById);
// productsRouter.post("/api/v1/products", pdtSchemaValidation, pdtsController.createProduct);
// productsRouter.patch("/api/v1/products/:id", joiValidationId, updateSchemaValidation, pdtsController.updateProduct);
// productsRouter.delete("/api/v1/products/:id", joiValidationId, pdtsController.deleteProduct);

module.exports = productsRouter;
