import { PostEntity } from "../../entities/post.entity";

export class PostOutputDto {
  id: number;
  title: string;
  content: string;
  userName: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    title: string,
    content: string,
    userName: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.userName = userName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromEntity(source: PostEntity): PostOutputDto {
    return new PostOutputDto(
      source.id,
      source.title,
      source.content,
      source.userName,
      source.createdAt,
      source.updatedAt
    );
  }
}
