import { Module } from "@nestjs/common";
import { PostModule } from "./modules/post/post.module";
import { CommentModule } from "./modules/comment/comment.module";

@Module({
  imports: [PostModule, CommentModule],
})
export class BoardModule {}
