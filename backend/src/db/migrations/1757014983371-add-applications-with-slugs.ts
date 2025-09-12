import { MigrationInterface, QueryRunner } from "typeorm";

export class AddApplicationsWithSlugs1757014983371 implements MigrationInterface {
    name = 'AddApplicationsWithSlugs1757014983371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."applications_status_enum" AS ENUM('pending', 'accepted', 'rejected', 'withdrawn')`);
        await queryRunner.query(`CREATE TABLE "applications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying NOT NULL, "applicantName" character varying(100), "applicantEmail" character varying, "applicantPhone" character varying(30), "message" text, "status" "public"."applications_status_enum" NOT NULL DEFAULT 'pending', "proposedRent" numeric(10,2), "preferredMoveInDate" date, "landlordNotes" text, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "propertyId" uuid, "applicantId" uuid, CONSTRAINT "UQ_7482543b92c5b8b51b988f890e5" UNIQUE ("slug"), CONSTRAINT "PK_938c0a27255637bde919591888f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."properties_availabilitystatus_enum" AS ENUM('available', 'rented', 'archived')`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "availabilityStatus" "public"."properties_availabilitystatus_enum" NOT NULL DEFAULT 'available'`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_a64def9710dc0f9469a7c100ee6" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_909867e55cc94e350ae38383cb5" FOREIGN KEY ("applicantId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_909867e55cc94e350ae38383cb5"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_a64def9710dc0f9469a7c100ee6"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "availabilityStatus"`);
        await queryRunner.query(`DROP TYPE "public"."properties_availabilitystatus_enum"`);
        await queryRunner.query(`DROP TABLE "applications"`);
        await queryRunner.query(`DROP TYPE "public"."applications_status_enum"`);
    }

}
