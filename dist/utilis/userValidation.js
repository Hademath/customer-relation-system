"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserSignUp = void 0;
const joi_1 = __importDefault(require("joi"));
const validateUserSignUp = (data) => {
    const schema = joi_1.default
        .object({
        firstName: joi_1.default.string().min(2).max(20).required(),
        lastName: joi_1.default.string().min(2).max(20).required(),
        userName: joi_1.default.string().min(5).max(25).required(),
        email: joi_1.default.string().required().email(),
        phone: joi_1.default.number().min(11).required(),
        profilePicture: joi_1.default.string(),
        password: joi_1.default.string().trim().min(6).required(),
        confirmPassword: joi_1.default.ref("password"),
    })
        .unknown();
    const option = {
        errors: { wrap: { label: " " } },
    };
    return schema.validate(data, option);
};
exports.validateUserSignUp = validateUserSignUp;
//# sourceMappingURL=userValidation.js.map