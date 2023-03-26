"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const connectDB_1 = require("./utils/connectDB");
const post_route_1 = __importDefault(require("./routes/post.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '50mb' }));
app.use((0, cors_1.default)({ origin: process.env.CLIENT_URL }));
app.use("/api/v1", post_route_1.default);
(0, connectDB_1.connectDB)(process.env.MONGO_URI).then(() => {
    console.log("Connected to DB");
});
app.listen({ port: parseInt(process.env.PORT) }, () => {
    console.log(`Server is running`);
});
