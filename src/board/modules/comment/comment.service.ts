import { Injectable, NotFoundException } from "@nestjs/common";
import { CommentEntity } from "./entities/comment.entity";
import {
  DataSource,
  DeepPartial,
  EntityManager,
  FindManyOptions,
  FindOptionsWhere,
  In,
} from "typeorm";
import { PostService } from "../post/post.service";

@Injectable()
export class CommentService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly postService: PostService
  ) {}

  getComments(
    options: FindManyOptions<CommentEntity> = {},
    entityManager?: EntityManager
  ): Promise<CommentEntity[]> {
    const em = entityManager ?? this.dataSource.createEntityManager();
    return em.find(CommentEntity, options);
  }

  getTotalCommentsCount(
    where: FindOptionsWhere<CommentEntity> = {}
  ): Promise<number> {
    const repo = this.dataSource.getRepository(CommentEntity);
    return repo.countBy(where);
  }

  async loadChildren(comment: CommentEntity, visited: Set<number> = new Set()) {
    if (!comment.children || comment.children.length === 0) return;

    if (visited.has(comment.id)) return;
    visited.add(comment.id);

    const repo = this.dataSource.getRepository(CommentEntity);
    const children = await repo.find({
      where: {
        parentCommentId: In(comment.children.map((child) => child.id)),
      },
    });

    await Promise.all(
      comment.children.map(async (child) => {
        child.children = children.filter(
          ({ parentCommentId }) => parentCommentId === child.id
        );

        await this.loadChildren(child, visited);
      })
    );
  }

  async createComment(
    createData: DeepPartial<CommentEntity>,
    entityManager?: EntityManager
  ): Promise<CommentEntity> {
    const em = entityManager ?? this.dataSource.createEntityManager();

    const [postComment] = createData.postComments;
    const post = await this.postService.getPost(
      { id: postComment.post.id },
      em
    );
    if (!post) {
      throw new NotFoundException("post not found");
    }

    const comment = em.create(CommentEntity, createData);

    return em.save(CommentEntity, comment);
  }
}
