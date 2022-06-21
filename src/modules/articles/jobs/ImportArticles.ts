import { IMailProvider } from "@shared/containers/providers/MailProvider/models/IMailProvider";
import { axios } from "@shared/infra/utils/axios";
import { inject, injectable } from "tsyringe";
import { Article } from "../infra/typeorm/entities/Article";
import { IArticlesRepository } from "../repositories/IArticlesRepository";

interface IRequest {
  id?: number;
  featured: boolean;
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  summary: string;
  publishedAt: Date;
  updatedAt: Date;
}

@injectable()
class ImportArticles {
  private baseUrl: string;

  constructor(
    @inject("ArticlesRepository")
    private articlesRepository: IArticlesRepository,
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) {
    this.baseUrl = "https://api.spaceflightnewsapi.net/v3";
  }

  async execute(): Promise<void> {
    const importedArticles: Article[] = [];
    const errors = [] as any;

    try {
      console.log("importando artigos");

      const importedsCount =
        (await this.articlesRepository.getImportedsCount()) || 0;

      const { data: articlesTotalCount } = await axios.get<number>(
        `${this.baseUrl}/articles/count`
      );

      const { data: articlesFromApi } = await axios.get<IRequest[]>(
        `${this.baseUrl}/articles`,
        {
          params: {
            _limit: articlesTotalCount,
            _sort: "id",
            _start: importedsCount,
          },
        }
      );

      await Promise.all(
        articlesFromApi.map(async (article) => {
          const referenceId = article.id as number;

          const articleAlreadyImported =
            await this.articlesRepository.findByReferenceId(referenceId);

          const articleToBeImported = Object.assign(article, { referenceId });
          if (!articleAlreadyImported) {
            try {
              delete article.id;
              const importedArticle = await this.articlesRepository.create(
                articleToBeImported
              );

              console.log(`artigo com id ${referenceId} importado`);
              importedArticles.push(importedArticle);
            } catch (error) {
              errors.push(error);
            }
          }
        })
      );
    } catch (err) {
      errors.push(err);
    }

    console.log(`${importedArticles.length} artigos importados`);
    console.log(errors.length, "erros ao importar artigos");

    if (errors.length > 0) {
      console.log("enviando notificação de erro");
      await this.mailProvider.sendMail({
        from: '"Space Flight News" <errors@spaceflightnews.com>',
        to: "errors@spaceflightnews.com",
        subject: `Notificação de Erro`,
        body: `Aviso: ${errors.length} ${
          errors.length > 1 ? "errors" : "erro"
        } ${errors.length > 1 ? "ocorreram" : "ocorrido"} ao importar artigos`,
      });
    }
  }
}

export { ImportArticles };
