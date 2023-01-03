var express = require("express");
var router = express.Router();

const {
  getallProduct,
  getallProducttest,
} = require("../controllers/getProducts");
router.route("/").get(getallProduct);
router.route("/test").get(getallProducttest);
module.exports = router;
