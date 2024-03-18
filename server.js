import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./db.js";
import bodyParser from "body-parser";
import cors from "cors";
import colors from "colors";
import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();

//database
connectDB();

//middlewares
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT;

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(
    `Server Running on mode ${process.env.DEV_MODE} on port ${port}`.bgCyan
      .white
  );
});
