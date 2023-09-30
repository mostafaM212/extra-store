const express = require("express");
const path = require("path");

const mongoose = require("mongoose");
const app = express();
const angularCoreMiddleware = require("./middleware/angularCoreHeaders.middleware");
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");

mongoose
  .connect("mongodb://localhost:27017/extraStore")
  .then((data) => {
    // console.log("test", data);
    console.log("test", "connected to database successfully");
  })
  .catch((e) => {
    console.log("test", "failed to connect to database");
  });
app.use(express.json());
app.use(express.urlencoded());
app.use(angularCoreMiddleware);
app.use("/images", express.static(path.join("backend/images")));

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/category", categoryRoutes);
app.use((req, res, next) => {
  res.send("hello from express");
});
module.exports = app;
