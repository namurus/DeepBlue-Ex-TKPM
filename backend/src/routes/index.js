import express from "express"
import studentRoute from "./studentRoute";
import facultyRoute from "./facultyRoute";
let router = express.Router();

let initWebRoutes = (app) => {
    router.use("/students", studentRoute);
    router.use("/faculties", facultyRoute);
    return app.use("/", router);
}

module.exports = initWebRoutes;