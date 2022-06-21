import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateArticleUseCase } from "./UpdateArticleUseCase";

class UpdateArticleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
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

    const updateArticleUseCase = container.resolve(UpdateArticleUseCase);

    const updatedArticle = await updateArticleUseCase.execute({
      id: Number(id),
      featured,
      imageUrl,
      newsSite,
      summary,
      title,
      url,
      events,
      launches,
    });

    return response.json(updatedArticle);
  }
}

export { UpdateArticleController };
