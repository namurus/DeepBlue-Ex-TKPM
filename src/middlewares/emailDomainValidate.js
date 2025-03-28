import { body, validationResult } from 'express-validator';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./src/config/allowEmailDomain.json', 'utf8'));
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
            // Truyền lỗi sang EJS
            return res.redirect('/create-student?error=email_domain');
        }
        next();
    },
];

module.exports = validateRegistration;