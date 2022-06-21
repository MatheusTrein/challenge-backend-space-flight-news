import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createArticlesLaunches1654802285759 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "articles_launches",
        columns: [
          {
            name: "launch_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "article_id",
            type: "integer",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: "FKLaunchArticle",
            referencedTableName: "launches",
            referencedColumnNames: ["id"],
            columnNames: ["launch_id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          {
            name: "FKArticleLaunch",
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
    await queryRunner.dropTable("launches_articles");
  }
}
