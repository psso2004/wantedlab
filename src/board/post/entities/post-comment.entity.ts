import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PostEntity } from "./post.entity";
import { CommentEntity } from "../../comment/entities/comment.entity";

@Entity("board_post_comments")
export class PostCommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  /**
   * relations
   */
  @ManyToOne(() => PostEntity, (post) => post.postComments)
  @JoinColumn({ name: "post_id" })
  post: PostEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.postComments)
  @JoinColumn({ name: "comment_id" })
  comment: CommentEntity;
}
