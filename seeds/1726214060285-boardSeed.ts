import { MigrationInterface, QueryRunner } from "typeorm";

export class BoardSeed1726214060285 implements MigrationInterface {
  name = "BoardSeed1726214060285";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into board_posts (title, content, user_name, password) values ('첫번째 게시글 입니다.', '안녕하세요. 첫번째 게시글 입니다.', '홍길동', '$2b$10$wJkJo8X2ROUc9Q82.G3Rv.MCEsdQfvXnL.GhFLTkZdRNc1oyBLWnq')`
    );
    await queryRunner.query(
      `insert into board_posts (title, content, user_name, password) values ('두번째 게시글 입니다.', '안녕하세요. 두번째 게시글 입니다.', '홍길동', '$2b$10$wJkJo8X2ROUc9Q82.G3Rv.MCEsdQfvXnL.GhFLTkZdRNc1oyBLWnq')`
    );
    await queryRunner.query(
      `insert into board_posts (title, content, user_name, password) values ('세번째 게시글 입니다.', '안녕하세요. 세번째 게시글 입니다.', '임꺽정', '$2b$10$wJkJo8X2ROUc9Q82.G3Rv.MCEsdQfvXnL.GhFLTkZdRNc1oyBLWnq')`
    );
    await queryRunner.query(
      `insert into board_posts (title, content, user_name, password) values ('네번째 게시글 입니다.', '안녕하세요. 네번째 게시글 입니다.', '임꺽정', '$2b$10$wJkJo8X2ROUc9Q82.G3Rv.MCEsdQfvXnL.GhFLTkZdRNc1oyBLWnq')`
    );
    await queryRunner.query(
      `insert into board_posts (title, content, user_name, password) values ('네번째 게시글 입니다.', '안녕하세요. 네번째 게시글 입니다.', '임꺽정', '$2b$10$wJkJo8X2ROUc9Q82.G3Rv.MCEsdQfvXnL.GhFLTkZdRNc1oyBLWnq')`
    );

    await queryRunner.query(
      `insert into board_comments (content, user_name) values ('임꺽정 첫번째 댓글입니다.', '임꺽정')`
    );
    await queryRunner.query(
      `insert into board_comments (parent_comment_id, content, user_name) values (1, '임꺽정 대댓글입니다.', '임꺽정')`
    );
    await queryRunner.query(
      `insert into board_comments (content, user_name) values ('임꺽정 두번째 댓글입니다.', '임꺽정')`
    );
    await queryRunner.query(
      `insert into board_comments (content, user_name) values ('홍길동 첫번째 댓글입니다.', '홍길동')`
    );

    await queryRunner.query(
      `insert into board_post_comments (post_id, comment_id) values (1, 1)`
    );
    await queryRunner.query(
      `insert into board_post_comments (post_id, comment_id) values (1, 2)`
    );
    await queryRunner.query(
      `insert into board_post_comments (post_id, comment_id) values (2, 3)`
    );
    await queryRunner.query(
      `insert into board_post_comments (post_id, comment_id) values (3, 4)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
