import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUser1763309879344 implements MigrationInterface {
  name = 'UpdateUser1763309879344';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "rating" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ADD "balance" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "balance"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "rating"`);
  }
}
