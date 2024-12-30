import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1735487869130 implements MigrationInterface {
    name = 'Migration1735487869130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "email_templates" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "html" character varying NOT NULL, "preview" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_by" integer, "updated_by" integer, "deleted_by" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_06c564c515d8cdb40b6f3bfbbb4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "email_templates"`);
    }

}
