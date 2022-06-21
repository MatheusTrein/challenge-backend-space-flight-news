import { IArticleResponse } from "../dtos/IArticleResponse";
import { Article } from "../infra/typeorm/entities/Article";

class ArticleMapper {
  public static toDTO({ referenceId, ...rest }: Article): IArticleResponse {
    return {
      ...rest,
    };
  }
}

export { ArticleMapper };
