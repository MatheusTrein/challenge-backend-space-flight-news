import { ICreateArticle } from "@modules/articles/dtos/ICreateArticle";
import { IFindArticles } from "@modules/articles/dtos/IFindArticles";
import { Article } from "@modules/articles/infra/typeorm/entities/Article";
import { IArticlesRepository } from "../IArticlesRepository";

class FakeArticlesRepository implements IArticlesRepository {
  private repository: Article[];

  constructor() {
    this.repository = [];
  }

  async create(data: ICreateArticle): Promise<Article> {
    let article: Article;

    if (data.id) {
      article = this.repository.find(
        (article) => article.id === data.id
      ) as Article;

      Object.assign(article, {
        ...data,
        updatedAt: new Date(),
      });
    }

    article = new Article();

    Object.assign(article, {
      ...data,
      id: this.repository.length + 1,
      featured: data.featured ? data.featured : false,
      publishedAt: data.publishedAt ? data.publishedAt : new Date(),
      updatedAt: new Date(),
    });

    this.repository.push(article);

    return article;
  }

  async findByQuery({
    orderBy,
    titleSearch,
  }: IFindArticles): Promise<Article[]> {
    let articles: Article[] = this.repository;

    articles.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

    if (orderBy === "ASC") {
      articles.reverse();
    }

    if (titleSearch) {
      articles = articles.filter((article) =>
        article.title.toUpperCase().search(titleSearch.toUpperCase())
      );
    }

    return articles;
  }

  async listOne(id: number): Promise<Article | null> {
    const article = this.repository.find((article) => article.id === id);

    return article || null;
  }

  async findByReferenceId(referenceId: number): Promise<Article | null> {
    const article = this.repository.find(
      (article) => article.referenceId === referenceId
    );

    return article || null;
  }

  async getImportedsCount(): Promise<number | null> {
    return this.repository.filter((article) => !!article.referenceId).length;
  }

  async findById(id: number): Promise<Article | null> {
    const article = this.repository.find((article) => article.id === id);

    return article || null;
  }

  async deleteById(id: number): Promise<void> {
    const articleIndex = this.repository.findIndex(
      (article) => article.id === id
    );
    this.repository.splice(articleIndex, 1);
  }
}

export { FakeArticlesRepository };
