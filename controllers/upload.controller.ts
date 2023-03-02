import { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
import { config } from "dotenv";
config();

const dalle_config = new Configuration({
  apiKey: process.env.OPENAI_SECRET_KEY!,
});

const openai = new OpenAIApi(dalle_config);

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    const aiRes = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = aiRes.data.data[0].b64_json;

    res.status(200).send({ photo: image });
  } catch (error: any) {
    res.status(500).send(error?.response.data.error.message);
  }
};
