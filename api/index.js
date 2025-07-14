import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

const app = express();

app.use(express.json());

dotenv.config({
  path: "./.env",
});

// db connection function
const connectDB = async () => {
  try {
    const connectInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${process.env.DB_NAME}`
    );
    console.log(
      `connected successfully and host is ${connectInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection failed", error);
  }
};

// Start server only after DB connection
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("server connection failed", err);
  });

//routes
app.use("/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message =  err.message || 'Internal sever error';
  res.status(statusCode).json({
    success: false,
    message
  });
});

