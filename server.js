const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/routes");
const authorRouter = require("./routes/authorRouter");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayout);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));

//connect to database
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to the database"));

//routes
app.use("/", indexRouter);
app.use("/authors", authorRouter);

//server is running
app.listen(process.env.PORT || 5000, () => console.log("listening on port"));
