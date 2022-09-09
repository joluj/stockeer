import { MigrationInterface, QueryRunner } from 'typeorm';

export class StockeerAndProductEntities1662750499394
  implements MigrationInterface
{
  name = 'StockeerAndProductEntities1662750499394';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."product_entity_quantityunit_enum" AS ENUM('PIECE', 'KG', 'ML')`
    );
    await queryRunner.query(
      `CREATE TABLE "product_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "expiryDate" character varying NOT NULL, "name" character varying NOT NULL, "storageId" uuid NOT NULL, "barcode" character varying NOT NULL, "quantityAmount" integer NOT NULL, "quantityUnit" "public"."product_entity_quantityunit_enum" NOT NULL DEFAULT 'PIECE', CONSTRAINT "PK_6e8f75045ddcd1c389c765c896e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "storage_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_38fdf515dd0e12034143873eeab" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_entity_role_enum" AS ENUM('USER', 'ADMIN')`
    );
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "username" text NOT NULL, "role" "public"."user_entity_role_enum" DEFAULT 'USER', "passwordHash" character varying, "creationTime" TIMESTAMP NOT NULL DEFAULT now(), "editedTime" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9b998bada7cff93fcb953b0c37e" UNIQUE ("username"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "product_entity" ADD CONSTRAINT "FK_d2939461ce17dd877114322ca4a" FOREIGN KEY ("storageId") REFERENCES "storage_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_entity" DROP CONSTRAINT "FK_d2939461ce17dd877114322ca4a"`
    );
    await queryRunner.query(`DROP TABLE "user_entity"`);
    await queryRunner.query(`DROP TYPE "public"."user_entity_role_enum"`);
    await queryRunner.query(`DROP TABLE "storage_entity"`);
    await queryRunner.query(`DROP TABLE "product_entity"`);
    await queryRunner.query(
      `DROP TYPE "public"."product_entity_quantityunit_enum"`
    );
  }
}
