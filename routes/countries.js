var express = require("express");
var router = express.Router();
let WeatherController = require("../controller/WeatherController");

router.get("/GetWeather", WeatherController.findCountryWeather);

module.exports = router;

