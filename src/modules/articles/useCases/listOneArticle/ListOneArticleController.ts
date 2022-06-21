import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListOneArticleUseCase } from "./ListOneArticleUseCase";

class ListOneArticleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listOneArticleUseCase = container.resolve(ListOneArticleUseCase);

    const article = await listOneArticleUseCase.execute(Number(id));

    return response.json(article);
  }
}

export { ListOneArticleController };
