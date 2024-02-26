const express = require('express');
const APP_SERVER = express();

APP_SERVER.use("/api",require("./routes/Route"));



module.exports = APP_SERVER;