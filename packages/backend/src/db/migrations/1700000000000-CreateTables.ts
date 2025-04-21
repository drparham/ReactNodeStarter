import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create tags table
    await queryRunner.query(`
      CREATE TABLE "tag" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_tag_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_tag_name" UNIQUE ("name")
      );
    `);

    // Create articles table
    await queryRunner.query(`
      CREATE TABLE "article" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying NOT NULL,
        "slug" character varying NOT NULL,
        "content" text NOT NULL,
        "published" boolean NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_article_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_article_slug" UNIQUE ("slug")
      );
    `);

    // Create article_tags join table
    await queryRunner.query(`
      CREATE TABLE "article_tags_tag" (
        "articleId" uuid NOT NULL,
        "tagId" uuid NOT NULL,
        CONSTRAINT "PK_article_tags_tag" PRIMARY KEY ("articleId", "tagId"),
        CONSTRAINT "FK_article_tags_tag_articleId" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "FK_article_tags_tag_tagId" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "article_tags_tag"`);
    await queryRunner.query(`DROP TABLE "article"`);
    await queryRunner.query(`DROP TABLE "tag"`);
  }
} 