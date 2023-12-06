const express = require("express");

const mongoose = require("mongoose"); //mongo setup
const app = express();

const Product = require("./models/products.js");

app.use(express.json()); //json middleware neccesary for api testing


app.get("/", (request, response) => {
  response.send(
    "i made sabrina pregnant the night we married and have 2 beautiful daughters irina and sarah"
  );
});
app.get("/about", (request, response) => {
  response.send(
    "sarah has inherited sabrinas hot sexy body, whereas irina inherited sabrinas beauty"
  );
});

//get all products
app.get("/allProducts", async (request, response) => {
  try {
    const products = await Product.find({});
    response.status(200).json(products);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});


//by ID
app.get("/product/:id", async (request, response) => {
  try {
    const {id} = request.params;
    const product = await Product.findById(id);
    response.status(200).json(product);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});


//update product by ID
app.put("/product/:id", async (request, response) => {
  try {
    const {id} = request.params;
    const product = await Product.findByIdAndUpdate(id,request.body);

    if(!product){
      return response.status(404).json({message:`product with id ${id} not found`})
    }
    const updatedProduct = await Product.findById(id)
    response.status(200).json(updatedProduct);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});


//delete product by id
app.delete("/product/:id", async (request, response) => {
  try {
    const {id} = request.params;
    const product = await Product.findByIdAndDelete(id);

    if(!product){
      return response.status(404).json({message:`product with id ${id} not found`})
    }
    response.status(200).json(product);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});


//create new product
app.post("/create", async (request, response) => {
  try {
    const product = await Product.create(request.body);
    response
      .status(200)
      .json({ message: `product ${product.name} created successfulyy` });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});


//mongo setup
mongoose
  .connect(
    "mongodb+srv://root:root@ameya.xfuqbbh.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(1000, () => {
      console.log(`server running on port 1000`);
    });
    console.log(`Connected to mongodb server`);
  })
  .catch((err) => {
    console.log(`error:`, err);
  });
