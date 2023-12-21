import { NextFunction, RequestHandler, Response, Request } from "express";
import { ObjectId } from "mongodb";
import { ZodError, ZodSchema, z } from "zod";

export const ObjectIdSchema = z.custom<ObjectId>(
	(value) => value instanceof ObjectId || ObjectId.isValid(String(value)),
	{
		message: "Invalid ObjectId",
	}
);

export const validateReq: (
	schema: ZodSchema,
	type?: string
) => RequestHandler = (schema: ZodSchema, type?: string) => {
	return (req, res, next) => {
		try {
			if (!type) {
				schema.parse(req.body);
				next();
			} else {
				if (type === "req") {
					schema.parse(req);
					next();
				}
			}
		} catch (error) {
			if (error instanceof ZodError) {
				res.status(400).json({ error: error.issues });
			}
			console.log(error);
			// res.status(400).json({ error: error });
		}
	};
};

export type TypedRequestHandler<T extends z.infer<z.Schema>> = (
	req: T & Omit<Request, "body">,
	res: Response,
	next: NextFunction
) => void;
export type FullTypedRequestHandler<T extends z.infer<z.Schema>> = (
	req: T & Omit<Request, "body | query | params">,
	res: Response,
	next: NextFunction
) => void;

export type ObjectIdType = typeof ObjectIdSchema;
