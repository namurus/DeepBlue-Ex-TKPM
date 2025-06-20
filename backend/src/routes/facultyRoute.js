import express from "express"
const router = express.Router();

import facultyController from "../controllers/faculty.controller";

router.post("/", facultyController.createFaculty);
router.post("/update/:id", facultyController.updateFaculty);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Faculty
 *   description: Faculty management
 */

/**
 * @swagger
 * /faculty:
 *   post:
 *     summary: Create a new faculty
 *     tags: [Faculty]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Computer Science
 *               description:
 *                 type: string
 *                 example: Faculty of Computer Science
 *     responses:
 *       201:
 *         description: Faculty created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /faculty/update/{id}:
 *   post:
 *     summary: Update a faculty by ID
 *     tags: [Faculty]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Faculty ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Computer Science
 *               description:
 *                 type: string
 *                 example: Updated description
 *     responses:
 *       200:
 *         description: Faculty updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Faculty not found
 */