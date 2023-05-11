const express = require("express");
const userRouter = express.Router();
const { usersController } = require("../controllers");
const {userSchemaValidation, userUpdateSchemaValidation} = require("../middlewares");


//all APIs should have a health check that is a request to review that our server is working
userRouter.get("/", usersController.getAllUsers);
userRouter.get("/:id", usersController.getUserById);
userRouter.post("/", userSchemaValidation.userSchemaValidation, usersController.createUser);
userRouter.patch("/:id", userUpdateSchemaValidation.userUpdateSchemaValidation, usersController.updateUser);
userRouter.delete("/:id", usersController.deleteUser);



module.exports = userRouter;