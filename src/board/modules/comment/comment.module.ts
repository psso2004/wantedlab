import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentEntity } from "./entities/comment.entity";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { PostModule } from "../post/post.module";
import { BullModule } from "@nestjs/bullmq";

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
    PostModule,
    BullModule.registerQueue({
      name: "keyword",
    }),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
