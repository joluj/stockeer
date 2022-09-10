import { MigrationInterface, QueryRunner } from 'typeorm';

export class BarcodeEntities1662819433365 implements MigrationInterface {
  name = 'BarcodeEntities1662819433365';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "barcode_entity" ("barcode" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8642d18104c74ff6a97b64e8365" PRIMARY KEY ("barcode"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "barcode_entity"`);
  }
}
