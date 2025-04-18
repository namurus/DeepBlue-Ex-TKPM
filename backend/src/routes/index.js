import express from "express"
import studentRoute from "./studentRoute";
import facultyRoute from "./facultyRoute";
import courseRoute from "./courseRoute";
let router = express.Router();

let initWebRoutes = (app) => {
    router.use("/students", studentRoute);
    router.use("/faculties", facultyRoute);
    router.use("/courses", courseRoute);
    return app.use("/", router);
}

module.exports = initWebRoutes;