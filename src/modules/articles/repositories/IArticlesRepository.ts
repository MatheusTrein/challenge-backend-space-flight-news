import { ICreateArticle } from "../dtos/ICreateArticle";
import { IFindArticles } from "../dtos/IFindArticles";
import { Article } from "../infra/typeorm/entities/Article";

interface IArticlesRepository {
  create(data: ICreateArticle): Promise<Article>;
  findByQuery(data: IFindArticles): Promise<Article[]>;
  listOne(id: number): Promise<Article | null>;
  getImportedsCount(): Promise<number | null>;
  findByReferenceId(referenceId: number): Promise<Article | null>;
  findById(id: number): Promise<Article | null>;
  deleteById(id: number): Promise<void>;
}

export { IArticlesRepository };
