var cors = require("cors");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/idress");
var db = mongoose.connection;
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var countryRouter = require("./routes/countries");
var secureUser = require("./routes/secureUsers");
var authentificationRouter = require("./routes/authentification");
require("./auth/auth");
const passport = require("passport");

var app = express();
//handle mongo error
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("connected !");
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/authentification", authentificationRouter);
app.use("/countries", countryRouter);
app.use(
  "/secure",
  passport.authenticate("jwt", { session: false }),
  secureUser
);
app.use(
  "/items",
  express.static(__dirname + "/items")
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
  console.log(err);
});

module.exports = app;
