const { Router } = require("express");
const router = Router();
const { healthCheckController } = require("../controllers");
const path= require("path");


router
    .get("/", healthCheckController.welcomePage)
    .get("/health", healthCheckController.healthCheck)
    .use("/api/v1/products", require("./productRoute"))
    .use("/api/v1/users", require("./userRoute"));

if (process.env.NODE_ENV !== "production") {
    router.get("/login", (req, res) => {
        res.sendFile(path.resolve("views/login.html"));
    });
    router.get("/playground", (req, res) => {
        res.sendFile(path.resolve("views/playground.html"));
    });
}

module.exports = router;