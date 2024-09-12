import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "./entities/post.entity";
import { PostCommentEntity } from "./entities/post-comment.entity";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, PostCommentEntity])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
