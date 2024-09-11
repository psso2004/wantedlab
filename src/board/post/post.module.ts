import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "./entities/post.entity";
import { PostCommentEntity } from "./entities/post-comment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, PostCommentEntity])],
})
export class PostModule {}
