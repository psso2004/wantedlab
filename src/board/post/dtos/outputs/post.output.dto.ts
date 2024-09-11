import { PostEntity } from "../../entities/post.entity";

export class PostOutputDto {
  id: number;
  title: string;
  content: string;
  userName: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(source: PostEntity) {
    this.id = source.id;
    this.title = source.title;
    this.content = source.content;
    this.userName = source.userName;
    this.createdAt = source.createdAt;
    this.updatedAt = source.updatedAt;
  }
}
