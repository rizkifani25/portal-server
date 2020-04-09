const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

// user
const loginRouter = require("./routes/user/login");
const registerRouter = require("./routes/user/register");
const getUserDataRouter = require("./routes/user/get-data");
const getUserPostRouter = require("./routes/user/get-post");
const userCreatePostRouter = require("./routes/user/create-post");
const updateUserProfileRouter = require("./routes/user/update-profile");
const userDeletePostRouter = require("./routes/user/delete-post");

// customer
const customerRouter = require("./routes/customer/create");
const getAllCustomerRouter = require("./routes/customer/all");
const updateCustomerRouter = require("./routes/customer/update");
const deleteCustomerRouter = require("./routes/customer/delete");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const endpoint = require("./services/endpoint");
// "mongodb://localhost:27017/moprog"
require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USERNAME +
      ":" +
      process.env.DB_PASSWORD +
      "@sanskuydb-3dsfg.mongodb.net/" +
      process.env.DB_NAME,
    {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    }
  )
  .then(console.log("DB connected"))
  .catch((err) => console.log(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// user
app.use(endpoint.USER_LOGIN, loginRouter);
app.use(endpoint.USER_REGISTER, registerRouter);
app.use(endpoint.GET_USER_DATA, getUserDataRouter);
app.use(endpoint.GET_USER_POST, getUserPostRouter);
app.use(endpoint.ADD_POST, userCreatePostRouter);
app.use(endpoint.DELETE_POST, userDeletePostRouter);
app.use(endpoint.UPDATE_USER_DATA, updateUserProfileRouter);

// customer
app.use(endpoint.ADD_CUSTOMER, customerRouter);
app.use(endpoint.GET_CUSTOMER, getAllCustomerRouter);
// app.use(endpoint.UPDATE_CUSTOMER, updateCustomerRouter);
app.use(endpoint.DELETE_CUSTOMER, deleteCustomerRouter);

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
