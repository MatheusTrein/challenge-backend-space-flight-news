import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createArticle1654800426250 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "articles",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "reference_id",
            type: "integer",
            isNullable: true,
          },
          {
            name: "featured",
            type: "boolean",
            isNullable: true,
            default: false,
          },
          {
            name: "title",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "url",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "image_url",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "news_site",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "summary",
            type: "text",
            isNullable: false,
          },
          {
            name: "published_at",
            type: "timestamp with time zone",
            default: "now()",
            isNullable: false,
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "now()",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("articles");
  }
}
