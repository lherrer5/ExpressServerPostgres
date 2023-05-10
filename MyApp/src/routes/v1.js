const express = require("express");
const controller = require("../controllers/productsController");
const { healthCheck, welcomePage } = require("../controllers/healthCheckController");
const productsRouter = express.Router();
// const pdtoSchemaValidation=require("../middlewares/pdtSchemaValidation");
// const updateSchemaValidation=require("../middlewares/pdtSchemaValidation");
// const joiValidationId= require("../middlewares/pdtsIdValidator");
const {pdtSchemaValidation, updateSchemaValidation, joiValidationId} = require("../middlewares");

//all APIs should have a health check that is a request to review that our server is working
productsRouter.get("/", welcomePage);
productsRouter.get("/health", healthCheck);
productsRouter.get("/api/v1/products", controller.getAllProducts);
productsRouter.get("/api/v1/products/:id", joiValidationId, controller.getProductById);
productsRouter.post("/api/v1/products", pdtSchemaValidation, controller.createProduct);
productsRouter.patch("/api/v1/products/:id", joiValidationId, updateSchemaValidation, controller.updateProduct);
productsRouter.delete("/api/v1/products/:id", joiValidationId, controller.deleteProduct);


module.exports = productsRouter;
