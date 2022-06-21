import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";
import { ICacheProvider } from "@shared/containers/providers/CacheProvider/models/ICacheProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteArticleUseCase {
  constructor(
    @inject("ArticlesRepository")
    private articlesRepository: IArticlesRepository,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  async execute(id: number): Promise<void> {
    const articleExists = await this.articlesRepository.findById(id);

    if (!articleExists) {
      throw new AppError({ message: "Article not found" });
    }

    await this.articlesRepository.deleteById(id);

    await this.cacheProvider.invalidatePrefix("articles-list");
  }
}

export { DeleteArticleUseCase };
