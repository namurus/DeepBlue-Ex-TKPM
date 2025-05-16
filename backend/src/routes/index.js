import express from "express"
import studentRoute from "./studentRoute";
import facultyRoute from "./facultyRoute";
import courseRoute from "./courseRoute";
import classRoute from "./classRoute";
import configurationRoute from "./configurationRoute";

let router = express.Router();

let initWebRoutes = (app) => {
    router.use("/students", studentRoute);
    router.use("/faculties", facultyRoute);
    router.use("/courses", courseRoute);
    router.use("/classes", classRoute);
    router.use("/configuration", configurationRoute);
    return app.use("/", router);
}

module.exports = initWebRoutes;