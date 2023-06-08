// const { Router } = require("express");
// const router = Router();
// const { healthCheck, welcomePage } = require("../controllers/healthCheckController");

// router
//     .get("/", welcomePage)
//     .get("/health", healthCheck);

// module.exports = router;

import { Router } from "express";
import { healthCheck, welcomePage } from "../controllers/healthCheckController";

const router = Router();

router
    .get("/", welcomePage)
    .get("/health", healthCheck);

export default router;