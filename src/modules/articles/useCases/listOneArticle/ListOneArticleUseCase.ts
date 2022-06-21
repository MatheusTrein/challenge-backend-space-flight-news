import { IArticleResponse } from "@modules/articles/dtos/IArticleResponse";
import { Article } from "@modules/articles/infra/typeorm/entities/Article";
import { ArticleMapper } from "@modules/articles/mappers/ArticleMapper";
import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";
import { ICacheProvider } from "@shared/containers/providers/CacheProvider/models/ICacheProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class ListOneArticleUseCase {
  constructor(
    @inject("ArticlesRepository")
    private articlesRepository: IArticlesRepository,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  async execute(id: number): Promise<IArticleResponse> {
    const cacheKey = `articles-list:--id-${id}`;

    let article = await this.cacheProvider.recover<Article>(cacheKey);

    if (!article) {
      article = await this.articlesRepository.listOne(id);
      await this.cacheProvider.save(cacheKey, article);
    }

    if (!article) {
      throw new AppError({ message: "Article id not found" });
    }

    return ArticleMapper.toDTO(article);
  }
}

export { ListOneArticleUseCase };
