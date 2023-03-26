"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = exports.getSinglePost = exports.getAllPosts = void 0;
const post_model_1 = __importDefault(require("../models/post.model"));
const cloudinary_1 = __importDefault(require("cloudinary"));
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        const skip = (page - 1) * perPage;
        const posts = yield post_model_1.default.find().skip(skip).limit(perPage);
        const totalPosts = yield post_model_1.default.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);
        const nextPage = page + 1 > totalPages ? null : page + 1;
        res.status(200).json({
            success: true,
            data: posts,
            currentPage: page,
            totalPages,
            totalPosts,
            nextPage,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
exports.getAllPosts = getAllPosts;
const getSinglePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield post_model_1.default.findById(id);
        res.status(200).json({ success: true, data: post });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
exports.getSinglePost = getSinglePost;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, prompt, image, blurhash } = req.body;
        const imageUrl = yield cloudinary_1.default.v2.uploader.upload(image);
        const newPost = yield post_model_1.default.create({
            name,
            prompt,
            image: imageUrl.url,
            blurhash,
        });
        res.status(201).json({ success: true, data: newPost });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
        console.log(err);
    }
});
exports.createPost = createPost;
