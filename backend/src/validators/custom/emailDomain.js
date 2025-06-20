import { allowedDomain } from "../../config/emailDomain.js";
import ApiError from "../../utils/ApiError.js";

export const validateEmailDomain = (value) => {
    console.log("Validating email domain:", value);
    if (!value.endsWith(allowedDomain)) {
        throw ApiError(StatusCodes.BAD_REQUEST, `Email phải có đuôi ${allowedDomain}`);
    }
    return true;
};
