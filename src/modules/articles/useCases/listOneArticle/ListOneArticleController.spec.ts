import "reflect-metadata";
import request from "supertest";
import typeorm from "@shared/infra/typeorm";
import { app } from "@shared/infra/http/app";

describe("ListOneArticleController", () => {
  beforeAll(async () => {
    await typeorm.initialize();
    await typeorm.runMigrations();
  });

  afterAll(async () => {
    await typeorm.dropDatabase();
    await typeorm.destroy();
  });

  it("should be able to list one Article", async () => {
    const { body: article } = await request(app).post("/articles").send({
      title: "title1",
      url: "https://arstechnica.com/science/2022/06/rocket-report-four-falcon-heavy-launches-this-year-meet-the-baguette-one/",
      imageUrl:
        "https://cdn.arstechnica.net/wp-content/uploads/2022/06/baguette.jpg",
      newsSite: "Arstechnica",
      summary:
        "Will we soon hear about SpaceX's proposed launch site in South Texas?",
      featured: false,
    });

    const response = await request(app).get(`/articles/${article.id}`).send();

    expect(response.body.id).toEqual(article.id);
    expect(response.status).toBe(200);
  });
});
