import express, {
  Express,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import dotenv from "dotenv";
import cors from "cors";
// import petsRouter from "./routes/pets";
import mongoose from "mongoose";
import petsRouter from "./modules/pet/pets.route";
import { userRouter } from "./modules/user/user.router";
import authRouter from "./modules/auth/auth.router";
import uploadRouter from "./modules/upload/upload.router";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}
const app: Express = express();
const port = process.env.PORT;

app.use(cors({ origin: "http://localhost:3000" }));
// app.use("/pets", petsRouter);
app.use(express.json({ limit: "50mb" }));

app.use(
  cors({
    origin: [
      "https://full-stack-pet-adoption-mayo-n-chip.vercel.app",
      "http://localhost:3000",
    ],
  })
);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/upload", uploadRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/pets", petsRouter);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ success: false, message: err });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
