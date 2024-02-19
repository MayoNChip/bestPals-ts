import { userService } from "../user/user.service";
import { authService } from "./auth.service";
import { TypedRequestHandler } from "../../utils/zodValidation";
import { LoginSchema, RegisterSchema } from "./auth.schema";

const login: TypedRequestHandler<{ body: LoginSchema }> = async (
	req,
	res,
	next
) => {
	const { email, password } = req.body;
	try {
		const userRes = await userService.findByEmail(email);

		if (!userRes) {
			return next("User not found");
		}

		const valid = authService.validateLogin(password, userRes?.password);

		if (!valid) {
			return next("Password is not correct");
		}

		const ACCESS_TOKEN = authService.generateAccessToken(userRes._id);

		res.send(ACCESS_TOKEN);
	} catch (error) {
		if (error instanceof Error) {
			next(error.message);
		}
	}
	//   const user = userRes[0];
};

const register: TypedRequestHandler<{ body: RegisterSchema }> = async (
	req,
	res,
	next
) => {
	const usersList = await userService.getAll();
	const hashedPassword = authService.generateHash(req.body.password);
	const user = { ...req.body, password: hashedPassword };
	const { repassword, ...userWithoutRepassword } = user;
	//   remove user.repassword;

	if (!usersList) {
		return next("failed to get users list");
	}
	if (usersList.find((i) => i.email === user.email)) {
		return next("User with this email already exists");
	}

	const newUser = await userService.createNewUser(userWithoutRepassword);
	const ACCESS_TOKEN = authService.generateAccessToken(newUser._id);

	console.info("new user", newUser._id);

	res.send({
		success: true,
		userId: newUser._id,
		ACCESS_TOKEN,
	});
};

export const authController = { login, register };
