import { FakeArticlesRepository } from "@modules/articles/repositories/fakes/FakeArticlesRepository";
import { FakeCacheProvider } from "@shared/containers/providers/CacheProvider/fakes/FakeCacheProvider";
import { CreateArticleUseCase } from "../createArticle/CreateArticleUseCase";
import { ListAllArticlesUseCase } from "./ListAllArticlesUseCase";

let fakeArticlesRepository: FakeArticlesRepository;
let fakeCacheProvider: FakeCacheProvider;
let listAllArticlesUseCase: ListAllArticlesUseCase;
let createArticleUseCase: CreateArticleUseCase;

describe("ListAllArticlesUseCase", () => {
  beforeAll(async () => {
    fakeArticlesRepository = new FakeArticlesRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createArticleUseCase = new CreateArticleUseCase(
      fakeArticlesRepository,
      fakeCacheProvider
    );
    listAllArticlesUseCase = new ListAllArticlesUseCase(
      fakeArticlesRepository,
      fakeCacheProvider
    );
    await createArticleUseCase.execute({
      title: "test 1",
      url: "https://arstechnica.com/science/2022/06/rocket-report-four-falcon-heavy-launches-this-year-meet-the-baguette-one/",
      imageUrl:
        "https://cdn.arstechnica.net/wp-content/uploads/2022/06/baguette.jpg",
      newsSite: "Arstechnica",
      summary:
        "Will we soon hear about SpaceX's proposed launch site in South Texas?",
      featured: false,
    });
    await createArticleUseCase.execute({
      title: "test 2",
      url: "https://arstechnica.com/science/2022/06/rocket-report-four-falcon-heavy-launches-this-year-meet-the-baguette-one/",
      imageUrl:
        "https://cdn.arstechnica.net/wp-content/uploads/2022/06/baguette.jpg",
      newsSite: "Arstechnica",
      summary:
        "Will we soon hear about SpaceX's proposed launch site in South Texas?",
      featured: false,
    });
    await createArticleUseCase.execute({
      title: "test 3",
      url: "https://arstechnica.com/science/2022/06/rocket-report-four-falcon-heavy-launches-this-year-meet-the-baguette-one/",
      imageUrl:
        "https://cdn.arstechnica.net/wp-content/uploads/2022/06/baguette.jpg",
      newsSite: "Arstechnica",
      summary:
        "Will we soon hear about SpaceX's proposed launch site in South Texas?",
      featured: false,
    });
    await createArticleUseCase.execute({
      title: "test 4",
      url: "https://arstechnica.com/science/2022/06/rocket-report-four-falcon-heavy-launches-this-year-meet-the-baguette-one/",
      imageUrl:
        "https://cdn.arstechnica.net/wp-content/uploads/2022/06/baguette.jpg",
      newsSite: "Arstechnica",
      summary:
        "Will we soon hear about SpaceX's proposed launch site in South Texas?",
      featured: false,
    });
    await createArticleUseCase.execute({
      title: "test 5",
      url: "https://arstechnica.com/science/2022/06/rocket-report-four-falcon-heavy-launches-this-year-meet-the-baguette-one/",
      imageUrl:
        "https://cdn.arstechnica.net/wp-content/uploads/2022/06/baguette.jpg",
      newsSite: "Arstechnica",
      summary:
        "Will we soon hear about SpaceX's proposed launch site in South Texas?",
      featured: false,
    });
    await createArticleUseCase.execute({
      title: "test 6",
      url: "https://arstechnica.com/science/2022/06/rocket-report-four-falcon-heavy-launches-this-year-meet-the-baguette-one/",
      imageUrl:
        "https://cdn.arstechnica.net/wp-content/uploads/2022/06/baguette.jpg",
      newsSite: "Arstechnica",
      summary:
        "Will we soon hear about SpaceX's proposed launch site in South Texas?",
      featured: false,
    });
    await createArticleUseCase.execute({
      title: "test 7",
      url: "https://arstechnica.com/science/2022/06/rocket-report-four-falcon-heavy-launches-this-year-meet-the-baguette-one/",
      imageUrl:
        "https://cdn.arstechnica.net/wp-content/uploads/2022/06/baguette.jpg",
      newsSite: "Arstechnica",
      summary:
        "Will we soon hear about SpaceX's proposed launch site in South Texas?",
      featured: false,
    });
  });

  it("should be able to list all articles if parameter page is equal to zero", async () => {
    const { articles } = await listAllArticlesUseCase.execute({ page: 0 });

    expect(articles).toHaveLength(7);
  });

  it("should be able to list articles with pagination system", async () => {
    const { articles, total } = await listAllArticlesUseCase.execute({
      page: 2,
      perPage: 1,
    });

    expect(articles.length).toBe(1);
    expect(total).toEqual(7);
  });

  it("should be able to list articles with title search system", async () => {
    const { articles, total } = await listAllArticlesUseCase.execute({
      page: 0,
      titleSearch: "test 1",
    });

    expect(articles.length).toBe(1);
    expect(total).toEqual(1);
  });

  it("should be able to list articles and set perPage automatically if page is greater than 0 and perPage not set", async () => {
    const { articles, total } = await listAllArticlesUseCase.execute({
      page: 1,
    });

    expect(articles.length).toBe(7);
    expect(total).toEqual(7);
  });
});
