import { FakeArticlesRepository } from "@modules/articles/repositories/fakes/FakeArticlesRepository";
import { FakeCacheProvider } from "@shared/containers/providers/CacheProvider/fakes/FakeCacheProvider";
import { AppError } from "@shared/errors/AppError";
import { CreateArticleUseCase } from "../createArticle/CreateArticleUseCase";
import { ListOneArticleUseCase } from "../listOneArticle/ListOneArticleUseCase";
import { DeleteArticleUseCase } from "./DeleteArticleUseCase";

let fakeArticlesRepository: FakeArticlesRepository;
let fakeCacheProvider: FakeCacheProvider;
let createArticleUseCase: CreateArticleUseCase;
let deleteArticleUseCase: DeleteArticleUseCase;
let listOneArticleUseCase: ListOneArticleUseCase;

describe("DeleteArticleUseCase", () => {
  beforeEach(() => {
    fakeArticlesRepository = new FakeArticlesRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createArticleUseCase = new CreateArticleUseCase(
      fakeArticlesRepository,
      fakeCacheProvider
    );
    deleteArticleUseCase = new DeleteArticleUseCase(
      fakeArticlesRepository,
      fakeCacheProvider
    );
    listOneArticleUseCase = new ListOneArticleUseCase(
      fakeArticlesRepository,
      fakeCacheProvider
    );
  });

  it("should be able to delete article", async () => {
    const article = await createArticleUseCase.execute({
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

    await deleteArticleUseCase.execute(article.id);

    await expect(
      listOneArticleUseCase.execute(article.id)
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to delete a non-existing article", async () => {
    await expect(
      deleteArticleUseCase.execute(Number("fake-id"))
    ).rejects.toBeInstanceOf(AppError);
  });
});
