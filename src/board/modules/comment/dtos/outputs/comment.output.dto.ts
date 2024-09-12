import { CommentEntity } from "../../entities/comment.entity";

export class CommentOutputDto {
  content: string;
  userName: string;
  children: CommentOutputDto[];
  createdAt: Date;

  constructor(
    content: string,
    userName: string,
    children: CommentEntity[] = [],
    createdAt: Date
  ) {
    this.content = content;
    this.userName = userName;
    this.children = children.map((child) => CommentOutputDto.fromEntity(child));
    this.createdAt = createdAt;
  }

  static fromEntity(source: CommentEntity) {
    return new CommentOutputDto(
      source.content,
      source.userName,
      source.children,
      source.createdAt
    );
  }
}
