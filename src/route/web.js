import express from "express"
import homeController from "../controllers/homeController"; 
let router = express.Router();

let initWebRoutes = (app) => {
    router.post("/create-student", homeController.createStudent);
    router.get("/get-student", homeController.displayStudent);
    router.get("/get-create-student", homeController.getCreateStudentPage);
    router.post("/delete-student", homeController.deleteStudent);
    router.get("/update-student", homeController.getUpdateStudentPage);
    router.post("/update-student", homeController.updateStudent);
    router.get("/add-faculty", homeController.getAddFacultyPage);
    router.post("/add-faculty", homeController.addFaculty);
    return app.use("/", router);
}

module.exports = initWebRoutes;