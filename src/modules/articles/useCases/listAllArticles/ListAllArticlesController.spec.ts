import "reflect-metadata";
import { app } from "@shared/infra/http/app";
import typeorm from "@shared/infra/typeorm";
import request from "supertest";

describe("ListAllArticlesController", () => {
  beforeAll(async () => {
    await typeorm.initialize();
    await typeorm.runMigrations();
  });

  afterAll(async () => {
    await typeorm.dropDatabase();
    await typeorm.destroy();
  });

  it("should be albe to list all articles", async () => {
    await request(app).post("/articles").send({
      title: "title1",
      url: "https://arstechnica.com/science/2022/06/rocket-report-four-falcon-heavy-launches-this-year-meet-the-baguette-one/",
      imageUrl:
        "https://cdn.arstechnica.net/wp-content/uploads/2022/06/baguette.jpg",
      newsSite: "Arstechnica",
      summary:
        "Will we soon hear about SpaceX's proposed launch site in South Texas?",
      featured: false,
    });

    await request(app).post("/articles").send({
      title: "title2",
      url: "https://arstechnica.com/science/2022/06/rocket-report-four-falcon-heavy-launches-this-year-meet-the-baguette-one/",
      imageUrl:
        "https://cdn.arstechnica.net/wp-content/uploads/2022/06/baguette.jpg",
      newsSite: "Arstechnica",
      summary:
        "Will we soon hear about SpaceX's proposed launch site in South Texas?",
      featured: false,
    });

    const response = await request(app)
      .get("/articles")
      .query({ page: 0 })
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: "title1" }),
        expect.objectContaining({ title: "title2" }),
      ])
    );
  });
});
