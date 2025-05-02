import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import {mongoDb} from './config/MongoDB.js';
import router from './routes/index.js';

dotenv.config();
mongoDb();
const app = express();
const port = process.env.port;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.get('/',(req,res) =>
{
  res.send('API is Running');
});
mongoose.connection.once("open", () => {
  console.log("Connected to DB");
  app.listen(port, ()=>
      {
      console.log(`listening on port ${port}`)
      });
  });
app.use(router);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message: message,
    statusCode: statusCode,
  });
});

