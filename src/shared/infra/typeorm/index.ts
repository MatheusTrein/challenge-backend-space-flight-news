import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

let config: DataSourceOptions = {
  type: "postgres",
  port: 5432,
  entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
  migrations: [
    "./src/shared/infra/typeorm/migrations/*.ts",
    "./src/shared/infra/typeorm/migrations",
  ],
};

if (process.env.NODE_ENV === "test") {
  Object.assign(config, {
    host: "postgres_space-flight-news_tests",
    username: "spaceflightnews",
    password: "coodesh",
    database: "space-flight-news_tests",
  });
} else if (process.env.NODE_ENV === "development") {
  Object.assign(config, {
    host: "postgres_space-flight-news_development",
    username: "spaceflightnews",
    password: "coodesh",
    database: "space-flight-news",
  });
} else if (process.env.NODE_ENV === "production") {
  Object.assign(config, {
    url: `postgres://${process.env.HEROKU_DB_USER}:${process.env.HEROKU_DB_PASSWORD}@${process.env.HEROKU_DB_HOST}/${process.env.HEROKU_DB_NAME}`,
    port: process.env.HEROKU_DB_PORT,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

export default new DataSource(config);
