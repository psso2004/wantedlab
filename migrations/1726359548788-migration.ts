import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1726359548788 implements MigrationInterface {
    name = 'Migration1726359548788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`keywords\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_name\` varchar(255) NOT NULL, \`keyword\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, INDEX \`IDX_c68bb4b6cbf5cd3c91a89889ec\` (\`user_name\`), INDEX \`IDX_38b72100fbc5d6fcc98bd89c0b\` (\`keyword\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`board_comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`parent_comment_id\` int NULL, \`content\` text NOT NULL, \`user_name\` varchar(255) NOT NULL, \`password\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`board_post_comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`post_id\` int NOT NULL, \`comment_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`board_posts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`user_name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, INDEX \`IDX_54662bce5faa04206220de923d\` (\`title\`), INDEX \`IDX_2b142d421803b5ee17a0538098\` (\`user_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`board_comments\` ADD CONSTRAINT \`FK_d5cf1143f4fd214a5f9d08c085a\` FOREIGN KEY (\`parent_comment_id\`) REFERENCES \`board_comments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board_post_comments\` ADD CONSTRAINT \`FK_c7a19e767dc1a05d8a27d359d5b\` FOREIGN KEY (\`post_id\`) REFERENCES \`board_posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board_post_comments\` ADD CONSTRAINT \`FK_d8f1bec7849d704164e7a275a2b\` FOREIGN KEY (\`comment_id\`) REFERENCES \`board_comments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board_post_comments\` DROP FOREIGN KEY \`FK_d8f1bec7849d704164e7a275a2b\``);
        await queryRunner.query(`ALTER TABLE \`board_post_comments\` DROP FOREIGN KEY \`FK_c7a19e767dc1a05d8a27d359d5b\``);
        await queryRunner.query(`ALTER TABLE \`board_comments\` DROP FOREIGN KEY \`FK_d5cf1143f4fd214a5f9d08c085a\``);
        await queryRunner.query(`DROP INDEX \`IDX_2b142d421803b5ee17a0538098\` ON \`board_posts\``);
        await queryRunner.query(`DROP INDEX \`IDX_54662bce5faa04206220de923d\` ON \`board_posts\``);
        await queryRunner.query(`DROP TABLE \`board_posts\``);
        await queryRunner.query(`DROP TABLE \`board_post_comments\``);
        await queryRunner.query(`DROP TABLE \`board_comments\``);
        await queryRunner.query(`DROP INDEX \`IDX_38b72100fbc5d6fcc98bd89c0b\` ON \`keywords\``);
        await queryRunner.query(`DROP INDEX \`IDX_c68bb4b6cbf5cd3c91a89889ec\` ON \`keywords\``);
        await queryRunner.query(`DROP TABLE \`keywords\``);
    }

}
