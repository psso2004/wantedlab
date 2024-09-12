import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "./entities/post.entity";
import { PostCommentEntity } from "./entities/post-comment.entity";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { BullModule } from "@nestjs/bullmq";

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, PostCommentEntity]),
    BullModule.registerQueue({
      name: "keyword",
    }),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
