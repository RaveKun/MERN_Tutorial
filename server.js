const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongooURI;

//connect to mongo db
mongoose
  .connect(db)
  .then(() => console.log("Mongo db connected"))
  .catch(err => console.log("Mongo db error : " + err));

app.get("/", (req, res) => res.send("Hello world!"));

//use route
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server runing on port " + port));
