import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentEntity } from "./entities/comment.entity";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { PostModule } from "../post/post.module";

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), PostModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
