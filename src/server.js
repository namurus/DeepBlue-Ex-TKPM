import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import connectDB from "./config/connectDB";
import logger from "./config/logger";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import morgan from "morgan";

dotenv.config();

let app = express();

if (!fs.existsSync("logs")) {
    fs.mkdirSync("logs");
}

const accessLogStream = fs.createWriteStream(path.join("logs", "access.log"), { flags: "a" });
app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
    logger.info(`Backend Node.js is running on port ${port}`);
});
