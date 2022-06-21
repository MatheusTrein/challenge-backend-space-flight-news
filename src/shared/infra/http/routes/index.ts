import { articlesRouter } from "@modules/articles/infra/http/routes/articles.routes";
import { Router } from "express";

const router = Router();

router.get("/", (request, response) => {
  return response.send("Fullstack Challenge 2021 🏅 - Space Flight News");
});
router.use("/articles", articlesRouter);

export { router };
