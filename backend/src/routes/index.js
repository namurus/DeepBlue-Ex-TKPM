import express from "express"
import studentRoute from "./studentRoute";
import facultyRoute from "./facultyRoute";
import courseRoute from "./courseRoute";
import classRoute from "./classRoute";
import configurationRoute from "./configurationRoute";
import gradeRoute from "./gradeRoute";

let router = express.Router();

let initWebRoutes = (app) => {
    router.use("/students", studentRoute);
    router.use("/faculties", facultyRoute);
    router.use("/courses", courseRoute);
    router.use("/classes", classRoute);
    router.use("/configuration", configurationRoute);
    router.use("/grades", gradeRoute);
    return app.use("/", router);
}

module.exports = initWebRoutes;