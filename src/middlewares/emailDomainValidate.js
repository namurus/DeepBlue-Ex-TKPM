import { body, validationResult } from 'express-validator';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('../config/allowEmailDomain.json', 'utf8'));
const allowedDomain = config.allowedDomain;

const validateEmailDomain = (value) => {
    if (!value.endsWith(allowedDomain)) {
        throw new Error(`Email phải có đuôi ${allowedDomain}`);
    }
    return true;
};

const validateRegistration = [
    body('email').isEmail().custom(validateEmailDomain),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = validateRegistration;