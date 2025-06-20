import express from "express"
import configurationController from "../controllers/configuration.controller";
const router = express.Router();


router.get("/", configurationController.getCurrentSchoolYear);
router.post("/", configurationController.updateCurrentSchoolYear);

module.exports = router;


/**
 * @swagger
 * /:
 *   get:
 *     summary: Lấy năm học hiện tại
 *     tags:
 *       - Configuration
 *     responses:
 *       200:
 *         description: Thành công, trả về năm học hiện tại
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 schoolYear:
 *                   type: string
 *                   example: "2023-2024"
 *   post:
 *     summary: Cập nhật năm học hiện tại
 *     tags:
 *       - Configuration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               schoolYear:
 *                 type: string
 *                 example: "2024-2025"
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cập nhật năm học thành công"
 */