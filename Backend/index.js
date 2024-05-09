const express = require("express");
const userRouter = require("./routes/UserRouter");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");

// middleware
const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/mern-expense-tracker")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Router
app.use("/", userRouter);

// Error handler
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => console.log(`The port is running in ${PORT}`));
