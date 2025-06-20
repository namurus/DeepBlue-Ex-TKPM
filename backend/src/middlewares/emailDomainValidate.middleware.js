import { body, validationResult } from "express-validator";
import { validateEmailDomain } from "../validators/custom/emailDomain.js";
import ApiError from "../utils/ApiError.js";
import { StatusCodes } from "http-status-codes";

const validateRegistration = [
    // Debug log
    (req, res, next) => {
        console.log(req.body);
        next();
    },

    // Validation rules
    body("email")
        .isEmail()
        .withMessage("Email không hợp lệ")
        .custom(validateEmailDomain),

    // Kiểm tra kết quả
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((err) => err.msg);
            return next(
                new ApiError(
                    StatusCodes.BAD_REQUEST,
                    "Validation failed",
                    errorMessages
                )
            );
        }
        next();
    },
];

export default validateRegistration;
