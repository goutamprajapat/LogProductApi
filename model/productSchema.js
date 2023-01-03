var mongoose = require("mongoose");
var productschema = new mongoose.Schema({
  name: { type: String, required: true },
  price: {
    type: Number,
    required: [true, "price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  company: {
    type: String,
    enum: {
      values: [
        "hikvison",
        "evz",
        "Pharma",
        "Cpz",
        "apple",
        "samsung",
        "dell",
        "mi",
      ],
      message: "{values} are not supported",
    },
  },
});
const ProductsData = mongoose.model("Products", productschema);
module.exports = ProductsData;
