import "reflect-metadata";
import typeorm from "@shared/infra/typeorm";
import request from "supertest";
import { app } from "@shared/infra/http/app";

describe("UpdateArticleController", () => {
  beforeAll(async () => {
    await typeorm.initialize();
    await typeorm.runMigrations();
  });

  afterAll(async () => {
    await typeorm.dropDatabase();
    await typeorm.destroy();
  });

  it("should be able to update an existing article", async () => {
    const { body: article } = await request(app).post("/articles").send({
      title:
        "SpaceX’s 23rd launch of the year carries Egyptian satellite into orbit",
      url: "https://www.teslarati.com/spacex-23rd-falcon-9-launch-2022-nilesat-301/",
      imageUrl:
        "https://www.teslarati.com/wp-content/uploads/2022/06/Nilesat-301-F9-B1062-LC-40-060822-Richard-Angle-launch-c.jpg",
      newsSite: "Teslarati",
      summary:
        "SpaceX has successfully completed its 23rd rocket launch and landing of 2022, delivering an Egyptian communications satellite to a nominal geostationary transfer...",
      featured: false,
    });

    const response = await request(app).put(`/articles/${article.id}`).send({
      title: "updated title",
      url: "https://www.teslarati.com/spacex-23rd-falcon-9-launch-2022-nilesat-301/",
      imageUrl:
        "https://www.teslarati.com/wp-content/uploads/2022/06/Nilesat-301-F9-B1062-LC-40-060822-Richard-Angle-launch-c.jpg",
      newsSite: "Teslarati",
      summary: "updated summary",
      featured: false,
    });

    expect(response.body).toEqual(
      expect.objectContaining({
        title: "updated title",
        summary: "updated summary",
      })
    );
    expect(response.status).toBe(200);
  });
});
