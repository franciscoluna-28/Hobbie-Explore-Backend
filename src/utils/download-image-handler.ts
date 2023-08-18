import { Request, Response } from "express";
import { downloadImage } from "./downloadImage";

export async function downloadImageHandler(req: Request, res: Response) {
  const imageUrl = req.query.url as string;

  try {
    const imageData = await downloadImage(imageUrl, "activity_image");

    res.setHeader("Content-Type", "image/jpeg");
    res.send(imageData);
  } catch (error) {
    console.error("Error downloading image:", error);
    res.status(500).json({ error: "Failed to download image" });
  }
}