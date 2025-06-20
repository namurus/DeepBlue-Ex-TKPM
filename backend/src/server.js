import express from "express";
import bodyParser from "body-parser";
import initWebRoutes from "./routes/index";
import connectDB from "./config/connectDB";
import logger from "./config/logger";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware";
import { setupSwagger } from "./docs/swagger";
dotenv.config();

let app = express();
app.use(cors({ origin: true, credentials: true }));

if (!fs.existsSync("logs")) {
    fs.mkdirSync("logs");
}

const accessLogStream = fs.createWriteStream(path.join("logs", "access.log"), { flags: "a" });
app.use(morgan("combined", { stream: accessLogStream }));

setupSwagger(app);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


initWebRoutes(app);
connectDB();

let port = process.env.PORT || 6969;

app.use(errorHandlingMiddleware);

app.listen(port, () => {
    logger.info(`Backend Node.js is running on port ${port}`);
});

