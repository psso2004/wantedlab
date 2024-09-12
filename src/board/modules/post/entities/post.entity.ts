import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { PostCommentEntity } from "./post-comment.entity";

@Entity("board_posts")
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  title: string;

  @Column({ type: "text" })
  content: string;

  @Index()
  @Column()
  userName: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  /**
   * =================== relations ===================
   */
  @OneToMany(() => PostCommentEntity, (postComment) => postComment.post)
  postComments: PostCommentEntity[];
  /**
   * =================================================
   */
}
