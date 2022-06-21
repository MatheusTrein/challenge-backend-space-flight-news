import { FakeArticlesRepository } from "@modules/articles/repositories/fakes/FakeArticlesRepository";
import { FakeCacheProvider } from "@shared/containers/providers/CacheProvider/fakes/FakeCacheProvider";
import { AppError } from "@shared/errors/AppError";
import { CreateArticleUseCase } from "../createArticle/CreateArticleUseCase";
import { UpdateArticleUseCase } from "./UpdateArticleUseCase";

let fakeArticlesRepository: FakeArticlesRepository;
let fakeCacheProvider: FakeCacheProvider;
let createArticlesUseCase: CreateArticleUseCase;
let updateArticleUseCase: UpdateArticleUseCase;

describe("UpdateArticleUseCase", () => {
  beforeEach(() => {
    fakeArticlesRepository = new FakeArticlesRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createArticlesUseCase = new CreateArticleUseCase(
      fakeArticlesRepository,
      fakeCacheProvider
    );
    updateArticleUseCase = new UpdateArticleUseCase(
      fakeArticlesRepository,
      fakeCacheProvider
    );
  });

  it("should be able to update Article by id", async () => {
    const { id: articleId } = await createArticlesUseCase.execute({
      title:
        "Rocket Report: Four Falcon Heavy launches this year; meet the Baguette-one",
      url: "https://arstechnica.com/science/2022/06/rocket-report-four-falcon-heavy-launches-this-year-meet-the-baguette-one/",
      imageUrl:
        "https://cdn.arstechnica.net/wp-content/uploads/2022/06/baguette.jpg",
      newsSite: "Arstechnica",
      summary:
        "Will we soon hear about SpaceX's proposed launch site in South Texas?",
      featured: false,
      events: [{ id: 1, provider: "Spacex" }],
      launches: [
        { id: "f4ffe15c-6009-4eaa-b60e-aef586c8cb5f", provider: "Spacex" },
      ],
    });

    const updatedArticle = await updateArticleUseCase.execute({
      id: articleId,
      title: "updated title",
      url: "https://arstechnica.com/science/2022/06/rocket-report-four-falcon-heavy-launches-this-year-meet-the-baguette-one/",
      imageUrl:
        "https://cdn.arstechnica.net/wp-content/uploads/2022/06/baguette.jpg",
      newsSite: "Arstechnica",
      summary:
        "Will we soon hear about SpaceX's proposed launch site in South Texas?",
      featured: false,
      events: [{ id: 1, provider: "updated provider" }],
      launches: [
        {
          id: "f4ffe15c-6009-4eaa-b60e-aef586c8cb5f",
          provider: "updated provider",
        },
      ],
    });

    expect(updatedArticle).toEqual(
      expect.objectContaining({
        title: "updated title",
        events: expect.arrayContaining([
          expect.objectContaining({ provider: "updated provider" }),
        ]),
        launches: expect.arrayContaining([
          expect.objectContaining({ provider: "updated provider" }),
        ]),
      })
    );
  });

  it("should not be able to update Article by id if Article id is not registered", async () => {
    await expect(
      updateArticleUseCase.execute({
        id: Number("fake-id"),
        title: "updated title",
        url: "https://arstechnica.com/science/2022/06/rocket-report-four-falcon-heavy-launches-this-year-meet-the-baguette-one/",
        imageUrl:
          "https://cdn.arstechnica.net/wp-content/uploads/2022/06/baguette.jpg",
        newsSite: "Arstechnica",
        summary:
          "Will we soon hear about SpaceX's proposed launch site in South Texas?",
        featured: false,
        events: [{ id: 1, provider: "updated provider" }],
        launches: [
          {
            id: "f4ffe15c-6009-4eaa-b60e-aef586c8cb5f",
            provider: "updated provider",
          },
        ],
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
