"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReq = exports.ObjectIdSchema = void 0;
const mongodb_1 = require("mongodb");
const zod_1 = require("zod");
exports.ObjectIdSchema = zod_1.z.custom((value) => value instanceof mongodb_1.ObjectId || mongodb_1.ObjectId.isValid(String(value)), {
    message: "Invalid ObjectId",
});
const validateReq = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.issues });
            }
            console.log(error);
            // res.status(400).json({ error: error });
        }
    };
};
exports.validateReq = validateReq;
