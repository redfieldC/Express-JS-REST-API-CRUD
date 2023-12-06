const Product = require('../models/products.js')


const getAllProducts = async (request, response) => {
  try {
    const products = await Product.find({});
    response.status(200).json(products);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const getOneProduct = async (request, response) => {
  try {
    const {id} = request.params;
    const product = await Product.findById(id);
    response.status(200).json(product);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}

const updateProductById = async (request, response) => {
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
}

const deleteProductById = async (request, response) => {
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
}

module.exports = {getAllProducts,getOneProduct,updateProductById,deleteProductById};

