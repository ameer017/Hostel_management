require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorMiddleware");
const mongoose = require("mongoose");
const connectDb = require("./config/DBConnect");
const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    optionSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use("/room", require("./routes/room"));

app.get("/", (req, res) => {
  res.send("Home Page!");
});

app.use(errorHandler);
connectDb();
mongoose.connection.once("open", () => {
  console.log("connected to MongoDb");
  app.listen(PORT, () => console.log(`App running on port ${PORT}`));
});
