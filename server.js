require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const errorMiddleware = require('./middleware/errorMiddleware.js');
const FRONTEND = process.env.FRONTEND

var cors = require('cors')

const app = express();

const productRoute = require('./routes/productRoutes.js');

// Middleware setup
app.use(express.json());
app.use('/api/products', productRoute);

app.get('/',(req,res)=>{
  throw new Error("FAKE ERROR")
})

var corsOptions = {
  origin: FRONTEND, //paste the react js server address here
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Error middleware should be placed after other middlewares and routes
app.use(errorMiddleware);
app.use(cors(corsOptions))
// .env
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 1000;

// MongoDB setup
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    console.log('Connected to MongoDB server');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
