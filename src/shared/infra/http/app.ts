import "dotenv/config";
import "reflect-metadata";

import typeORMConnection from "@shared/infra/typeorm";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { errors } from "celebrate";
import { container } from "tsyringe";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "./../../../../swagger.json";
import { router } from "./routes";
import "@shared/containers";
import { AppError } from "@shared/errors/AppError";
import { ImportArticles } from "@modules/articles/jobs/ImportArticles";
import { NodeCronProvider } from "@shared/containers/providers/CronProvider/implementations/NodeCronProvider";
import rateLimiter from "./middlewares/rateLimiter";

if (process.env.NODE_ENV !== "test") {
  typeORMConnection.initialize().then(() => {
    const ImportArticlesJob = container.resolve(ImportArticles);
    ImportArticlesJob.execute();
    const cronProvider = container.resolve(NodeCronProvider);
    cronProvider.create("0 9 * * *", "America/Sao_Paulo", () =>
      ImportArticlesJob.execute()
    );
  });
}

const app = express();

app.use(express.json());
app.use(rateLimiter);
app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(errors());
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        type: "error",
        message: error.message,
      });
    } else {
      return response.status(500).json({
        type: "error",
        message: `Internal server error`,
      });
    }
  }
);

export { app };
