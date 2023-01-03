const Product = require("../model/productSchema");

const getallProduct = async (req, res) => {
  const { company, name, featured, sort, select } = req.query;
  const queryObject = {};
  if (company) {
    queryObject.company = company;
  }
  if (featured) {
    queryObject.featured = featured;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  let apiData = Product.find(queryObject);
  if (sort) {
    const sortFix = sort.replace(".", "");
    apiData = apiData.sort(sortFix);
  }
  // (select = name company;
  if (select) {
    // let selectFix = select.replace(",", " ");
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;

  let skip = (page - 1) * limit;

  // page = 2;
  // limit = 3;
  // skip =  1 * 3 = 3
  apiData = apiData.skip(skip).limit(limit);

  const productdata = await apiData;
  res.status(200).json({ productdata, nbHits: productdata.length });
};

const getallProducttest = async (req, res) => {
  const productdata = await Product.find(req.query).sort("price");
  res.status(200).json({ productdata });
};
module.exports = { getallProduct, getallProducttest };
