"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// import petsRouter from "./routes/pets";
const mongoose_1 = __importDefault(require("mongoose"));
const pets_route_1 = __importDefault(require("./modules/pet/pets.route"));
const user_router_1 = require("./modules/user/user.router");
const auth_router_1 = __importDefault(require("./modules/auth/auth.router"));
const upload_router_1 = __importDefault(require("./modules/upload/upload.router"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
}
const app = (0, express_1.default)();
const port = process.env.PORT;
// app.use(cors({ origin: "http://localhost:3000" }));
// app.use("/pets", petsRouter);
app.use(express_1.default.json({ limit: "50mb" }));
app.use((0, cors_1.default)({
    origin: [
        "https://full-stack-pet-adoption-mayo-n-chip.vercel.app",
        "http://localhost:5173",
    ],
}));
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
});
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use("/upload", upload_router_1.default);
app.use("/auth", auth_router_1.default);
app.use("/users", user_router_1.userRouter);
app.use("/pets", pets_route_1.default);
app.use((err, req, res, next) => {
    res.status(500).send({ success: false, message: err });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
