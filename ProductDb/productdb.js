const ProductJson = require("../product.json");
var ProductsData = require("../model/productSchema");
const start = async () => {
  try {
    await ProductsData.deleteMany();
    await ProductsData.create(ProductJson);
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};
start()
module.exports = start;
