import { IArticleResponse } from "@modules/articles/dtos/IArticleResponse";
import { Article } from "@modules/articles/infra/typeorm/entities/Article";
import { Event } from "@modules/articles/infra/typeorm/entities/Event";
import { Launch } from "@modules/articles/infra/typeorm/entities/Launch";
import { ArticleMapper } from "@modules/articles/mappers/ArticleMapper";
import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";
import { ICacheProvider } from "@shared/containers/providers/CacheProvider/models/ICacheProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: number;
  featured: boolean;
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  summary: string;
  launches?: Launch[];
  events?: Event[];
}

@injectable()
class UpdateArticleUseCase {
  constructor(
    @inject("ArticlesRepository")
    private articlesRepository: IArticlesRepository,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  async execute(data: IRequest): Promise<IArticleResponse> {
    const articleExists = await this.articlesRepository.findById(data.id);

    if (!articleExists) {
      throw new AppError({ message: "Article not found" });
    }

    const { id: articleId } = await this.articlesRepository.create({
      ...data,
      updatedAt: new Date(),
    });

    await this.cacheProvider.invalidatePrefix("articles-list");

    const updatedArticle = await this.articlesRepository.findById(articleId);

    return ArticleMapper.toDTO(updatedArticle as Article);
  }
}

export { UpdateArticleUseCase };
