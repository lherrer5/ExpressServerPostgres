// const { Router } = require("express");
// const router = Router();
const express = require("express");
//const { healthCheckController, usersController} = require("../controllers");
const userRouter = express.Router();
const usersController = require("../controllers/userController");
//const {userSchemaValidation, userUpdateSchemaValidation, joiValidationId} = require("../middlewares");
// router.route('/')
//     .get(usersController.getAllUsers)
//     .post(usersController.createUser);

// router.route('/:id')
//     .get(usersController.getUserById)
//     //.put(usersController.updateUser)
//     .patch(usersController.updateUser)
//     .delete(usersController.deleteUser);

//module.exports = router;

// userRouter.get("/", healthCheckController.welcomePage);
// userRouter.get("/health", healthCheckController.healthCheck);
userRouter.get("/", usersController.getAllUsers);
// userRouter.get("/api/v1/users/:id", joiValidationId, usersController.getUserById);
// userRouter.post("/api/v1/users", userSchemaValidation, usersController.createUser);
// userRouter.patch("/api/v1/users/:id", joiValidationId, userUpdateSchemaValidation, usersController.updateUser);
// userRouter.delete("/api/v1/users/:id", joiValidationId, usersController.deleteUser);



module.exports = userRouter;