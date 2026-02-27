import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

// cors setup
app.use(cors({
    origin: process.env.CORS_ORIGIN, //frontend url whatever it is 
    credentials: true
}));

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js";
import filterRouter from "./routes/filter.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/categories", categoryRouter)
app.use("/api/v1/filters", filterRouter)
// http://localhost:8000/api/v1/users/register

// error handler 
app.use(errorMiddleware);

export { app }