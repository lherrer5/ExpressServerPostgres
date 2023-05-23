const express = require("express");
const userRouter = express.Router();
const { usersController } = require("../controllers");
const {userSchemaValidation, userUpdateSchemaValidation} = require("../middlewares");
const { isAuthenticated } = require("../middlewares");


//all APIs should have a health check that is a request to review that our server is working
userRouter.post("/login", usersController.login);

// userRouter.get("/", isAuthenticated, usersController.getAllUsers);
// userRouter.get("/:id", isAuthenticated, usersController.getUserById);
// userRouter.post("/", isAuthenticated, userSchemaValidation.userSchemaValidation, usersController.createUser);
// userRouter.patch("/:id", isAuthenticated, userUpdateSchemaValidation.userUpdateSchemaValidation, usersController.updateUser);
// userRouter.delete("/:id", isAuthenticated, usersController.deleteUser);
// userRouter.post("/login", isAuthenticated, usersController.login);

userRouter.use(isAuthenticated);
userRouter.get("/", usersController.getAllUsers);
userRouter.get("/:id", usersController.getUserById);
userRouter.post("/", userSchemaValidation.userSchemaValidation, usersController.createUser);
userRouter.patch("/:id", userUpdateSchemaValidation.userUpdateSchemaValidation, usersController.updateUser);
userRouter.delete("/:id", usersController.deleteUser);

module.exports = userRouter;