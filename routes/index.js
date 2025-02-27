const express = require("express");
const router = express.Router();

router.use("/users", require("./userRoute"));
router.use("/auth", require("./authRoute")); 
router.use("/", require("./swaggerRoutes"));
router.use("/books", require("./bookRoute"));


module.exports = router;