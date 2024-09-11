import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "./entities/post.entity";
import { PostCommentEntity } from "./entities/post-comment.entity";
import { PostController } from "./post.controller";

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, PostCommentEntity])],
  controllers: [PostController],
})
export class PostModule {}
