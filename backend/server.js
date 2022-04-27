import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/userRoutes.js"
import orderRouter from "./Routes/orderRoutes.js";
import productRoute from "./Routes/ProductRoutes.js";
import categoriesRouter from "./Routes/categoriesRoutes.js";
import favoritesRouter from './Routes/favoritesRoutes.js'

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());

// API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/categories", categoriesRouter)
app.use("/api/favorites", favoritesRouter)

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run in port ${PORT}`));
