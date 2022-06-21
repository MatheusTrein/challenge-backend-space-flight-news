import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllArticlesUseCase } from "./ListAllArticlesUseCase";

class ListAllArticlesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, perPage, orderBy, titleSearch } = request.query;

    const listAllArticlesUseCase = container.resolve(ListAllArticlesUseCase);

    const { articles, total } = await listAllArticlesUseCase.execute({
      page: Number(page),
      perPage: Number(perPage),
      orderBy: orderBy as string,
      titleSearch: titleSearch as string,
    });

    response.setHeader("x-total-count", total);

    return response.json(articles);
  }
}

export { ListAllArticlesController };
