import express from "express"
import homeController from "../controllers/studentController";
import validateRegistration from "../middlewares/emailDomainValidate";
import facultyRoute from "./facultyRoute";
let router = express.Router();

let initWebRoutes = (app) => {
    router.post("/create-student", validateRegistration, homeController.createStudent);
    router.get("/create-student", homeController.getCreateStudentPage);
    router.get("/get-student", homeController.displayStudent);
    router.post("/delete-student", homeController.deleteStudent);
    router.get("/update-student", homeController.getUpdateStudentPage);
    router.post("/update-student", homeController.updateStudent);
    router.use("/faculty", facultyRoute);
    return app.use("/", router);
}

module.exports = initWebRoutes;