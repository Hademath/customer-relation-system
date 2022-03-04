import express, { NextFunction } from "express";
import createError, { HttpError } from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";


import userRouter from "./routes/UserRoute";
import Organization from "./routes/OrganizationRoute";

const app = express();
  




app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());


//Routers
app.use('/users', userRouter)
app.use("/register", Organization);



// catch 404 and forward to error handler
app.use(function( next: NextFunction) {
  next(createError(404));
});



export default app;




