import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { PostCommentEntity } from "../../post/entities/post-comment.entity";

@Entity("board_comments")
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  parentCommentId: number | null;

  @Column({ type: "text" })
  content: string;

  @Column()
  userName: string;

  // 현재는 불필요한 컬럼이지만  추후 댓글 수정, 삭제가 추가될것을 고려해 추가.
  @Column({ nullable: true })
  password: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  /**
   * =================== relations ===================
   */
  @ManyToOne(() => CommentEntity, (comment) => comment.children, {
    nullable: true,
  })
  @JoinColumn({ name: "parent_comment_id" })
  parentComment: CommentEntity | null;

  @OneToMany(() => CommentEntity, (comment) => comment.parentComment)
  children: CommentEntity[];

  @OneToMany(() => PostCommentEntity, (postComment) => postComment.comment, {
    cascade: ["insert"],
  })
  postComments: PostCommentEntity[];
  /**
   * =================================================
   */
}
