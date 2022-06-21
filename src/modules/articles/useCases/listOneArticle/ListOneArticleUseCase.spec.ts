import { FakeArticlesRepository } from "@modules/articles/repositories/fakes/FakeArticlesRepository";
import { FakeCacheProvider } from "@shared/containers/providers/CacheProvider/fakes/FakeCacheProvider";
import { AppError } from "@shared/errors/AppError";
import { CreateArticleUseCase } from "../createArticle/CreateArticleUseCase";
import { ListOneArticleUseCase } from "./ListOneArticleUseCase";

let fakeArticlesRepository: FakeArticlesRepository;
let fakeCacheProvider: FakeCacheProvider;
let createArticleUseCase: CreateArticleUseCase;
let listOneArticleUseCase: ListOneArticleUseCase;

describe("ListOneArticleUseCase", () => {
  beforeAll(async () => {
    fakeArticlesRepository = new FakeArticlesRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createArticleUseCase = new CreateArticleUseCase(
      fakeArticlesRepository,
      fakeCacheProvider
    );
    listOneArticleUseCase = new ListOneArticleUseCase(
      fakeArticlesRepository,
      fakeCacheProvider
    );
  });

  it("should be able to list one Article", async () => {
    const { id } = await createArticleUseCase.execute({
      title: "teste1",
      url: "https://arstechnica.com/science/2022/06/rocket-report-four-falcon-heavy-launches-this-year-meet-the-baguette-one/",
      imageUrl:
        "https://cdn.arstechnica.net/wp-content/uploads/2022/06/baguette.jpg",
      newsSite: "Arstechnica",
      summary:
        "Will we soon hear about SpaceX's proposed launch site in South Texas?",
      featured: false,
    });

    const article = await listOneArticleUseCase.execute(id);

    expect(article.id).toBe(id);
  });

  it("should not be able to list one Article if id is not registered", async () => {
    await expect(
      listOneArticleUseCase.execute(Number("fake-id"))
    ).rejects.toBeInstanceOf(AppError);
  });
});
