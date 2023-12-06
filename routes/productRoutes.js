const express = require('express')

const {getAllProducts,getOneProduct,updateProductById,deleteProductById} = require('../controller/productController.js')

const router = express();
const Product = require("../models/products.js");

router.use(express.json());

router.get("/",getAllProducts); 


//by ID
router.get("/:id", getOneProduct);


//update product by ID
router.put("/:id", updateProductById);


//delete product by id
router.delete("/:id", deleteProductById);


//create new product
router.post("/create", async (request, response) => {
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


module.exports = router;