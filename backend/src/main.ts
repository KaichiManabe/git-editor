import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

// ミドルウェアの設定
app.use(cors({ origin: process.env.WEB_ORIGIN }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.json("Hello, World!");
});

app.post("/documents", async (req, res) => {
  const { title, content, authorId } = req.body;

  try {
    const document = await prisma.document.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    res.send(document);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// サーバーの起動
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
