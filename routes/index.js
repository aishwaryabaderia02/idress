var express = require("express");
const Country = require("../models/Country");
const Users = require("../models/Users");
const axios = require("axios");
const schedule = require("node-schedule");

var router = express.Router();

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const weatherUpdate = async () => {
  //   await timeout(10000);
  var j = schedule.scheduleJob({  minute: 36 }, async () => {
        console.log("country.length");

    await Country.find({}, async (error, country) => {
      console.log(country, error);
      for (let i = 0; i < country.length; i++) {
        await timeout(1000);
	console.log(country[i].country)
        console.log(country.length);

        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${country[i].lan}&lon=${country[i].long}&exclude=current,hourly&appid=3b58c044ad95cd8dcf4a5cba9f4ce8e8&units=metric`
          )
          .then(async (res) => {
            console.log(res.data.daily[0].temp.day, country[i].country);
            Country.updateOne(
              { country: country[i].country },
              { weather: res.data.daily[0].temp.day },
              async (err, c) => {
                if (err) {
                  console.log(error);
                } else {
                  console.log("done", c, country[i].country);
                }
              }
            );
          });
      }
    });
  });
};

/* GET home page. */
router.get("/", async function (req, res, next) {
  await Country.find({}, (item, a) => {
    console.log(item, a);
    res.send({ item, a });
  });
});

weatherUpdate();
module.exports = router;
