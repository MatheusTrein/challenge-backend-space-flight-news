import { IArticleResponse } from "@modules/articles/dtos/IArticleResponse";
import { Article } from "@modules/articles/infra/typeorm/entities/Article";
import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";
import { ICacheProvider } from "@shared/containers/providers/CacheProvider/models/ICacheProvider";
import { inject, injectable } from "tsyringe";
import { ArticleMapper } from "../../mappers/ArticleMapper";

interface IRequest {
  page: number;
  perPage?: number;
  orderBy?: string;
  titleSearch?: string;
}

interface IResponse {
  articles: IArticleResponse[];
  total: number;
}

@injectable()
class ListAllArticlesUseCase {
  constructor(
    @inject("ArticlesRepository")
    private articlesRepository: IArticlesRepository,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  async execute({
    page,
    perPage,
    orderBy,
    titleSearch,
  }: IRequest): Promise<IResponse> {
    let articles: Article[] | null;

    if (!orderBy) {
      orderBy = "DESC";
    }

    const cacheKey = `articles-list:--orderBy-${orderBy}`;

    articles = await this.cacheProvider.recover<Article[]>(cacheKey);

    if (!articles) {
      articles = await this.articlesRepository.findByQuery({
        orderBy: orderBy as "DESC" | "ASC",
      });

      await this.cacheProvider.save(cacheKey, articles);
    }

    //Aqui foi preferido usar o sistema de busca por título via JS, para poder ser feito o sistema de cache e obter uma resposta mais rápida, tendo em vista que o banco de dados vai estar hospedado no heroku.
    if (titleSearch) {
      articles = articles.filter((article) => {
        const position = article.title
          .toUpperCase()
          .search(titleSearch.toUpperCase());

        return position === -1 ? false : true;
      });
    }

    const total = articles.length;

    let response: IResponse = {
      articles: articles.map((article) => ArticleMapper.toDTO(article)),
      total,
    };

    if (page > 0 && !perPage) {
      perPage = 10;
    }

    if (page && perPage) {
      const pageStart = (page - 1) * perPage;
      const pageEnd = pageStart + perPage;

      response.articles = articles.slice(pageStart, pageEnd);
    }

    return response;
  }
}

export { ListAllArticlesUseCase };
