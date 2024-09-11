import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "./entities/post.entity";
import { PostCommentEntity } from "./entities/post-comment.entity";
import { PostController } from "./post.controller";
import { PasswordGuard } from "./password.guard";

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, PostCommentEntity])],
  providers: [PasswordGuard],
  controllers: [PostController],
})
export class PostModule {}
