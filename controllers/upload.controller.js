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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const openai_1 = require("openai");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const dalle_config = new openai_1.Configuration({
    apiKey: process.env.OPENAI_SECRET_KEY,
});
const openai = new openai_1.OpenAIApi(dalle_config);
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { prompt } = req.body;
        const aiRes = yield openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
        });
        const image = aiRes.data.data[0].b64_json;
        res.status(200).send({ image });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.uploadImage = uploadImage;
