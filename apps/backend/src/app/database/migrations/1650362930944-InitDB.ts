import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1650362930944 implements MigrationInterface {
  name = 'InitDB1650362930944';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_entity_role_enum" AS ENUM('USER', 'ADMIN')`
    );
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "role" "public"."user_entity_role_enum" DEFAULT 'USER', "passwordHash" character varying, "creationTime" TIMESTAMP NOT NULL DEFAULT now(), "editedTime" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9b998bada7cff93fcb953b0c37e" UNIQUE ("username"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_entity"`);
    await queryRunner.query(`DROP TYPE "public"."user_entity_role_enum"`);
  }
}
