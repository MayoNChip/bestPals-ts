"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReq = void 0;
const validateReq = (schema) => {
    return (req, res, next) => {
        const validator = schema.parse(req.body);
        const valid = validator(req.body);
        if (!valid) {
            return next({ status: 400, msg: validator.errors });
        }
        next();
    };
};
exports.validateReq = validateReq;
