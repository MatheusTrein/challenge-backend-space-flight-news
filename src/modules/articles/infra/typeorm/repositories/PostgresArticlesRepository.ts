import { ICreateArticle } from "@modules/articles/dtos/ICreateArticle";
import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";
import { Repository } from "typeorm";
import typeorm from "@shared/infra/typeorm";
import { Article } from "../entities/Article";
import { IFindArticles } from "@modules/articles/dtos/IFindArticles";

class PostgresArticlesRepository implements IArticlesRepository {
  private repository: Repository<Article>;

  constructor() {
    this.repository = typeorm.getRepository(Article);
  }

  // Para o método de criar um artigo foi preciso usar raw SQL para registrar as relações no banco, pois existe um bug no TypeORM, deixo aqui o link da issue: https://github.com/typeorm/typeorm/issues/4122
  async create(data: ICreateArticle): Promise<Article> {
    const launches = data.launches;
    const events = data.events;
    delete data.events;
    delete data.launches;

    const article = await this.repository.save(this.repository.create(data));

    //Se estiver especificado o ID no objeto data, quer dizer que provavelmente quem esta usando essa função é o service de update,
    //então verifica se esta especificados o campo de lançamento, se tiver, apaga as relaçoes de lançamento com esse artigo
    if (data.id && launches) {
      await this.repository.query(
        `DELETE FROM articles_launches WHERE articles_launches.article_id = '${article.id}'`
      );
    }

    //Se estiver especificado o ID no objeto data, quer dizer que provavelmente quem esta usando essa função é o service de update,
    //então verifica se esta especificados o campo de eventos, se tiver, apaga as relaçoes de eventos com esse artigo
    if (data.id && events) {
      await this.repository.query(
        `DELETE FROM articles_events WHERE articles_events.article_id = '${article.id}'`
      );
    }

    //Se tiver especifado os lançamentos, cria todos
    if (launches) {
      await Promise.all(
        launches.map(async (launch) => {
          // Se tiver especificado o id, cria ou atualiza um lancamento com esse id
          if (launch.id) {
            await this.repository
              .query(`INSERT INTO public.launches (id,provider)
      VALUES ('${launch.id}','${launch.provider}') ON CONFLICT (id) DO UPDATE SET provider = '${launch.provider}'`);
          } else {
            //Se nao estver especificado o id, cria um novo lancamento
            const [{ id: launchId }] = await this.repository
              .query(`INSERT INTO public.launches (provider)
      VALUES ('${launch.provider}') RETURNING launches.id`);
            launch.id = launchId;
          }
          await this.repository
            .query(`INSERT INTO public.articles_launches ("article_id","launch_id")
  VALUES ('${article.id}','${launch.id}') ON CONFLICT DO NOTHING`);
        })
      );
    }

    //Se tiver especifado os eventos, cria todos
    if (events) {
      await Promise.all(
        events.map(async (event) => {
          // Se tiver especificado o id, cria ou atualiza um evento com esse id
          if (event.id) {
            await this.repository.query(`INSERT INTO public.events (id,provider)
      VALUES ('${event.id}','${event.provider}') ON CONFLICT (id) DO UPDATE SET provider = '${event.provider}'`);
          } else {
            //Se nao estver especificado o id, cria um novo evento
            const [{ id: eventId }] = await this.repository
              .query(`INSERT INTO public.events (provider)
      VALUES ('${event.provider}') RETURNING events.id`);
            event.id = eventId;
          }
          await this.repository
            .query(`INSERT INTO public.articles_events ("article_id","event_id")
      VALUES ('${article.id}','${event.id}') ON CONFLICT DO NOTHING`);
        })
      );
    }

    return article;
  }

  async findByQuery(data: IFindArticles): Promise<Article[]> {
    const queryBuilder = this.repository
      .createQueryBuilder("articles")
      .leftJoinAndSelect("articles.launches", "articles_launches")
      .leftJoinAndSelect("articles.events", "articles_events");

    queryBuilder.orderBy("articles.published_at", data.orderBy);

    if (data.titleSearch) {
      queryBuilder.andWhere("UPPER(articles.title) like UPPER(:titleSearch)", {
        titleSearch: `%${data.titleSearch}%`,
      });
    }
    const articles = await queryBuilder.getMany();

    return articles;
  }

  async listOne(id: number): Promise<Article | null> {
    const article = await this.repository.findOne({
      where: {
        id,
      },
      relations: ["launches", "events"],
    });

    return article;
  }

  async getImportedsCount(): Promise<number | null> {
    const result =
      ((await this.repository.query(
        "SELECT COUNT(*) FROM articles WHERE articles.reference_id IS NOT NULL"
      )) as [{ count: number }]) || null;

    const importedsCount = result[0].count || null;

    return importedsCount;
  }

  async findByReferenceId(referenceId: number): Promise<Article | null> {
    const article = await this.repository.findOne({ where: { referenceId } });

    return article;
  }

  async findById(id: number): Promise<Article | null> {
    const article = await this.repository.findOne({
      where: { id },
      relations: ["launches", "events"],
    });

    return article;
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

export { PostgresArticlesRepository };
