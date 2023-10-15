const express = require("express");
const task_router = require("../router/task_router");
const user_router = require("../router/user_router");
const connectDB = require("../db/connection");
const error =  require("../middleware/errorMiddleware");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/task", task_router);
app.use("/user", user_router);
app.use(error)
const start = async () => {
  await connectDB(process.env.Mongo_uri);
  app.listen(3000, () => {
    console.log("listening on port http://localhost:3000");
  });
};

start();
