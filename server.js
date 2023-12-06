require('dotenv').config()

const express = require("express");

const mongoose = require("mongoose"); //mongo setup
const app = express();

const productRoute = require('./routes/productRoutes.js')

app.use("/api/products",productRoute)

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 1000

 //json middleware neccesary for api testing

//mongo setup
mongoose
  .connect(
    MONGO_URL
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
    console.log(`Connected to mongodb server`);
  })
  .catch((err) => {
    console.log(`error:`, err);
  });
