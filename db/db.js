var mongoose = require("mongoose");
mongoose.set("strictQuery", true);
var db = mongoose
.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("db connect");
})
.catch((e) => {
  console.log("no connection");
});