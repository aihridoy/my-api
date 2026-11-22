import express, { type Application } from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";

export const app: Application = express();

//middlewares
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use(globalErrorHandler);