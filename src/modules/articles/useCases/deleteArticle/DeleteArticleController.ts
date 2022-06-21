import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteArticleUseCase } from "./DeleteArticleUseCase";

class DeleteArticleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteArticleUseCase = container.resolve(DeleteArticleUseCase);

    await deleteArticleUseCase.execute(Number(id));

    return response.json({ message: "Article deleted" });
  }
}

export { DeleteArticleController };
