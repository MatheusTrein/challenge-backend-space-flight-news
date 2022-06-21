import { FakeArticlesRepository } from "@modules/articles/repositories/fakes/FakeArticlesRepository";
import { FakeCacheProvider } from "@shared/containers/providers/CacheProvider/fakes/FakeCacheProvider";
import { CreateArticleUseCase } from "./CreateArticleUseCase";

let fakeArticlesRepository: FakeArticlesRepository;
let fakeCacheProvider: FakeCacheProvider;
let createArticleUseCase: CreateArticleUseCase;

describe("CreateArticleUseCase", () => {
  beforeEach(() => {
    fakeArticlesRepository = new FakeArticlesRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createArticleUseCase = new CreateArticleUseCase(
      fakeArticlesRepository,
      fakeCacheProvider
    );
  });

  it("should be able to create a new article", async () => {
    const article = await createArticleUseCase.execute({
      title:
        "Rocket Report: Four Falcon Heavy launches this year; meet the Baguette-one",
      url: "https://arstechnica.com/science/2022/06/rocket-report-four-falcon-heavy-launches-this-year-meet-the-baguette-one/",
      imageUrl:
        "https://cdn.arstechnica.net/wp-content/uploads/2022/06/baguette.jpg",
      newsSite: "Arstechnica",
      summary:
        "Will we soon hear about SpaceX's proposed launch site in South Texas?",
      featured: false,
    });

    expect(article).toHaveProperty("id");
  });
});
