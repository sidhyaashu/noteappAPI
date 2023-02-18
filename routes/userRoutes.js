const express = require("express");
const { signup, signin } = require("../controllers/userController");
const userRoute = express.Router();


userRoute.post("/sighup",signup)
userRoute.post("/sighin",signin)


module.exports = userRoute