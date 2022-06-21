import { container } from "tsyringe";

import "@shared/containers/providers";

import { PostgresArticlesRepository } from "@modules/articles/infra/typeorm/repositories/PostgresArticlesRepository";
import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";

container.registerSingleton<IArticlesRepository>(
  "ArticlesRepository",
  PostgresArticlesRepository
);
