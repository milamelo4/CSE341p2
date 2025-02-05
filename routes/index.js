const express = require("express");
const router = express.Router();

router.use("/users", require("./userRoute"));
router.use("/", require("./swaggerRoutes"));

module.exports = router;