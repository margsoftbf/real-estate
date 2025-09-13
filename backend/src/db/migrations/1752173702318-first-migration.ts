import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1752173702318 implements MigrationInterface {
  name = 'FirstMigration1752173702318';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'landlord', 'tenant')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "firstName" character varying(100), "lastName" character varying(100), "email" character varying NOT NULL, "passwordHash" character varying, "phoneNumber" character varying(30), "avatarUrl" character varying(255), "role" "public"."users_role_enum" NOT NULL DEFAULT 'tenant', "address" text, "city" character varying(100), "postalCode" character varying(20), "emailVerified" boolean NOT NULL DEFAULT false, "privacyConsent" boolean NOT NULL DEFAULT false, "marketingConsent" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "lastLoginAt" TIMESTAMP, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_bc0c27d77ee64f0a097a5c269b3" UNIQUE ("slug"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
