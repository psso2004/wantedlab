import { CommentEntity } from "../../entities/comment.entity";

export class CommentOutputDto {
  content: string;
  userName: string;
  children: CommentOutputDto;
  createdAt: Date;

  constructor(source: CommentEntity) {
    this.content = source.content;
    this.userName = source.userName;
    this.createdAt = source.createdAt;
  }
}
