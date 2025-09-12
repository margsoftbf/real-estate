import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProperty1753815172871 implements MigrationInterface {
  name = 'AddProperty1753815172871';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."properties_type_enum" AS ENUM('sell', 'rent')`,
    );
    await queryRunner.query(
      `CREATE TABLE "properties" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying NOT NULL, "type" "public"."properties_type_enum" NOT NULL, "price" numeric(10,2) NOT NULL, "city" character varying(100) NOT NULL, "country" character varying(100) NOT NULL, "title" character varying(200), "photos" text array NOT NULL DEFAULT '{}', "description" text, "features" jsonb, "priceHistory" jsonb DEFAULT '[]', "isPopular" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "ownerId" uuid, CONSTRAINT "UQ_089e10e6f1282e7b4bd0c58263e" UNIQUE ("slug"), CONSTRAINT "PK_2d83bfa0b9fcd45dee1785af44d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "country" character varying(100)`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" ADD CONSTRAINT "FK_47b8bfd9c3165b8a53cd0c58df0" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "properties" DROP CONSTRAINT "FK_47b8bfd9c3165b8a53cd0c58df0"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "country"`);
    await queryRunner.query(`DROP TABLE "properties"`);
    await queryRunner.query(`DROP TYPE "public"."properties_type_enum"`);
  }
}
