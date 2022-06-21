import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateArticleUseCase } from "./CreateArticleUseCase";

class CreateArticleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      featured,
      imageUrl,
      newsSite,
      summary,
      title,
      url,
      events,
      launches,
    } = request.body;

    const createArticleUseCase = container.resolve(CreateArticleUseCase);

    const article = await createArticleUseCase.execute({
      featured,
      imageUrl,
      newsSite,
      summary,
      title,
      url,
      events,
      launches,
    });

    return response.status(201).json(article);
  }
}

export { CreateArticleController };
