const { Router } = require("express");
const router = Router();
const { healthCheckController } = require("../controllers")


router
    .get("/", healthCheckController.welcomePage)
    .get("/health", healthCheckController.healthCheck)
    .use("/api/v1/products", require("./productRoute"))
    .use("/api/v1/users", require("./userRoute"));

module.exports = router;