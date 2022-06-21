import { Launch } from "@modules/articles/infra/typeorm/entities/Launch";
import { Event } from "@modules/articles/infra/typeorm/entities/Event";
import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";
import { inject, injectable } from "tsyringe";
import { IArticleResponse } from "@modules/articles/dtos/IArticleResponse";
import { ArticleMapper } from "@modules/articles/mappers/ArticleMapper";
import { Article } from "@modules/articles/infra/typeorm/entities/Article";
import { ICacheProvider } from "@shared/containers/providers/CacheProvider/models/ICacheProvider";

interface IRequest {
  featured: boolean;
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  summary: string;
  publishedAt?: Date;
  launches?: Launch[];
  events?: Event[];
}

@injectable()
class CreateArticleUseCase {
  constructor(
    @inject("ArticlesRepository")
    private articlesRepository: IArticlesRepository,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  async execute(data: IRequest): Promise<IArticleResponse> {
    const { id: articleId } = await this.articlesRepository.create(data);

    await this.cacheProvider.invalidatePrefix("articles-list");

    const article = await this.articlesRepository.findById(articleId);

    return ArticleMapper.toDTO(article as Article);
  }
}

export { CreateArticleUseCase };
