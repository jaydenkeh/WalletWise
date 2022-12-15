require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const userController = require("./controllers/userController.js");
const Income = require("./models/Income.js");
const incomeController = require("./controllers/incomeController.js");

const app = express();
const PORT = process.env.PORT ?? 3000;
const MONGO_URI = process.env.MONGO_URI;

console.log("Mongo_URI", MONGO_URI);
mongoose.set("debug", true);
mongoose.set("runValidators", true);
mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URI);

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("../client/dist"));
app.use("/api/signup", userController);

app.use("/api/income", incomeController);

app.get("/api", (req, res) => {
  res.json({ msg: "Hello World!" });
});

app.get("*", (req, res) =>
  res.sendFile(path.resolve("../client/dist", "index.html"))
);

mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
});
