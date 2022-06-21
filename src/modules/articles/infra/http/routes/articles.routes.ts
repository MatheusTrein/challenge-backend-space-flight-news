import { celebrate, Joi, Segments } from "celebrate";

import { CreateArticleController } from "@modules/articles/useCases/createArticle/CreateArticleController";
import { DeleteArticleController } from "@modules/articles/useCases/deleteArticle/DeleteArticleController";
import { ListAllArticlesController } from "@modules/articles/useCases/listAllArticles/ListAllArticlesController";
import { ListOneArticleController } from "@modules/articles/useCases/listOneArticle/ListOneArticleController";
import { UpdateArticleController } from "@modules/articles/useCases/updateArticle/UpdateArticleController";
import { Router } from "express";

const articlesRouter = Router();

const createArticleController = new CreateArticleController();
const listAllArticlesController = new ListAllArticlesController();
const listOneArticleController = new ListOneArticleController();
const updateArticleController = new UpdateArticleController();
const deleteArticleController = new DeleteArticleController();

articlesRouter.get("/:id", listOneArticleController.handle);

articlesRouter.put(
  "/:id",
  celebrate({
    [Segments.BODY]: Joi.object({
      featured: Joi.boolean().required(),
      title: Joi.string().required(),
      url: Joi.string().uri().required(),
      imageUrl: Joi.string().uri().required(),
      newsSite: Joi.string().required(),
      summary: Joi.string().required(),
      events: Joi.array().items({
        id: Joi.number(),
        provider: Joi.string().required(),
      }),
      launches: Joi.array().items({
        id: Joi.string(),
        provider: Joi.string().required(),
      }),
    }),
  }),
  updateArticleController.handle
);

articlesRouter.delete("/:id", deleteArticleController.handle);

articlesRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object({
      featured: Joi.boolean(),
      title: Joi.string().required(),
      url: Joi.string().uri().required(),
      imageUrl: Joi.string().uri().required(),
      newsSite: Joi.string().required(),
      summary: Joi.string().required(),
      launches: Joi.array().items({
        id: Joi.string(),
        provider: Joi.string().required(),
      }),
      events: Joi.array().items({
        id: Joi.number(),
        provider: Joi.string().required(),
      }),
    }),
  }),
  createArticleController.handle
);

articlesRouter.get(
  "/",
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().required().min(0),
      perPage: Joi.number().min(1),
      titleSearch: Joi.string(),
      orderBy: Joi.string().valid("ASC", "DESC"),
    },
  }),
  listAllArticlesController.handle
);

export { articlesRouter };
