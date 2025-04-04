import { body, validationResult } from "express-validator";
import fs from "fs";

// This middleware validates the email domain of the user during registration
const config = JSON.parse(fs.readFileSync("./src/config/allowEmailDomain.json", "utf8"));
const allowedDomain = config.allowedDomain;

// Middleware to validate email domain
const validateEmailDomain = (value) => {
    if (!value.endsWith(allowedDomain)) {
        throw new Error(`Email phải có đuôi ${allowedDomain}`);
    }
    return true;
};

// Middleware to validate registration form
const validateRegistration = [
    body("email").isEmail().withMessage("Email không hợp lệ").custom(validateEmailDomain),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg);
            return res.render("createStudent.ejs", { error: errorMessages.join(", "), success: false });
        }
        next();
    },
];

export default validateRegistration;
