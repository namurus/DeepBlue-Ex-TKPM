import express from "express"
import homeController from "../controllers/homeController"; 
let router = express.Router();

let initWebRoutes = (app) => {
    router.post("/create-student", homeController.createStudent);
    router.get("/get-student", homeController.displayStudent);
    router.get("/get-create-student", homeController.getCreateStudentPage);
    return app.use("/", router);
}

module.exports = initWebRoutes;