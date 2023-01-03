require("dotenv").config();
var express = require("express");
var cookieParser = require("cookie-parser");
const productRouter = require("./router/products");
require("./ProductDb/productdb");
var app = express();
app.use(express.json());
app.use(cookieParser());

app.use(require("./router/auth"));
app.use("/api", productRouter);
app.get("/", (req, res) => {
  res.send("hello");
});

const start = () => {
  try {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log("Express server listening on port " + PORT);
    });
  } catch (e) {
    console.log(e);
  }
};
start();
