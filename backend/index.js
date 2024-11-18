import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import contactRouter from "./src/routers/contact.routes.js";

const app = express();
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/contacts", contactRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to Database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to Database: ", error.message);
  });
