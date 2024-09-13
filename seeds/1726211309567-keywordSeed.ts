import { MigrationInterface, QueryRunner } from "typeorm";

export class KeywordSeed1726211309567 implements MigrationInterface {
  name = "KeywordSeed1726211309567";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into keywords (user_name, keyword) values ('홍길동', '길동길동')`
    );
    await queryRunner.query(
      `insert into keywords (user_name, keyword) values ('임꺽정', '임꺽정')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
