import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createArticlesEvents1654802293330 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "articles_events",
        columns: [
          {
            name: "event_id",
            type: "integer",
            isNullable: false,
            isUnique: false,
          },
          {
            name: "article_id",
            type: "integer",
            isNullable: false,
            isUnique: false,
          },
        ],
        foreignKeys: [
          {
            name: "FKEventArticle",
            referencedTableName: "events",
            referencedColumnNames: ["id"],
            columnNames: ["event_id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          {
            name: "FKArticleEvent",
            referencedTableName: "articles",
            referencedColumnNames: ["id"],
            columnNames: ["article_id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("articles_events");
  }
}
