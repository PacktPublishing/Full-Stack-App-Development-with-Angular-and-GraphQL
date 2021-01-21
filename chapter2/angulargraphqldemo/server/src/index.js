"use strict";
exports.__esModule = true;
var express_1 = require("express");
var PORT = 8080;
var app = express_1["default"]();
app.get('/', function (req, res) { return res.send('Express is successfully running!'); });
app.listen(PORT, function () {
    console.log("Server is running at https://localhost:" + PORT);
});
