const schedule = require("node-schedule");
const Country = require("../models/Country");

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const weatherUpdate = async () => {
  console.log("a");

  await Country.find({}, (item, a) => {
    console.log(item, a);
  });
  //   //   await timeout(10000);
  // //  var j = schedule.scheduleJob({ hour: 00, minute: 00 }, async () => {
  // //    console.log("country.length");

  //     await countries.find({}, async (error, country) => {
  // console.log(country,error)
  //       for (let i = 0; i < country.length; i++) {
  //         await timeout(1000);
  //         console.log(country.length);

  //         await axios
  //           .get(
  //             `https://api.openweathermap.org/data/2.5/onecall?lat=${country[i].lat}&lon=${country[i].long}&exclude=current&appid=3b58c044ad95cd8dcf4a5cba9f4ce8e8`
  //           )
  //           .then(async (res) => {
  //             Country.update(
  //               { Country: country[i].country },
  //               { weather: res.temperature },
  //               async (err, c) => {
  //                 if (err) {
  //                   console.log(error);
  //                 } else {
  //                   console.log("done", c, country[i].country);
  //                 }
  //               }
  //             );
  //             console.log(res);
  //           });
  //       }
  //     });
  // //  });
};
//weatherUpdate();
module.exports = { weatherUpdate };

