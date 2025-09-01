import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCoordinatesToProperty1756234096624 implements MigrationInterface {
    name = 'AddCoordinatesToProperty1756234096624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" ADD "latitude" numeric(10,6)`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "longitude" numeric(10,6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "latitude"`);
    }

}
