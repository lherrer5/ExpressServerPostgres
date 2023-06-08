const express = require("express");
const productsRouter = express.Router();
const { pdtsController } = require("../controllers");
const {pdtSchemaValidation ,updateSchemaValidation , joiValidationId} = require("../middlewares");


//all APIs should have a health check that is a request to review that our server is working
productsRouter.get("/", pdtsController.getAllProducts);
productsRouter.get("/:id", joiValidationId, pdtsController.getProductById);
productsRouter.post("/", pdtSchemaValidation.pdtSchemaValidation ,pdtsController.createProduct);
productsRouter.patch("/:id", joiValidationId, updateSchemaValidation.updateSchemaValidation, pdtsController.updateProduct);
productsRouter.delete("/:id", joiValidationId, pdtsController.deleteProduct);


module.exports = productsRouter;
