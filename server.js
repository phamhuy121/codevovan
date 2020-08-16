const express = require("express");
const app = express();
const methodOverride = require("method-override");

app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Routes
const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");
app.use("/admin", adminRoute);
app.use("/", shopRoute);
// Connect to database
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tienshop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to the database");
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("homepage");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
