import express from "express";
import dotenv from "dotenv";
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';

import { connectDB } from "./db/connectDB.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cookieParser());
 
app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port : ",PORT)
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });