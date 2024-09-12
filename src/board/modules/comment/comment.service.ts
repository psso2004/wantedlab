import { Injectable, NotFoundException } from "@nestjs/common";
import { CommentEntity } from "./entities/comment.entity";
import {
  DataSource,
  DeepPartial,
  EntityManager,
  FindManyOptions,
  FindOptionsWhere,
} from "typeorm";
import { PostService } from "../post/post.service";

@Injectable()
export class CommentService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly postService: PostService
  ) {}

  getComment(
    where: FindOptionsWhere<CommentEntity>,
    entityManager?: EntityManager
  ): Promise<CommentEntity | null> {
    const em = entityManager ?? this.dataSource.createEntityManager();
    return em.findOneBy(CommentEntity, where);
  }

  getComments(
    options: FindManyOptions<CommentEntity> = {}
  ): Promise<CommentEntity[]> {
    return null;
  }

  getTotalCommentsCount(
    where: FindOptionsWhere<CommentEntity> = {}
  ): Promise<number> {
    return null;
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

    const parentComment =
      createData.parentCommentId !== null
        ? await this.getComment({ id: createData.parentCommentId }, em)
        : null;
    const rootCommentId =
      parentComment !== null ? parentComment.rootCommentId : null;
    const comment = em.create(
      CommentEntity,
      Object.assign(createData, {
        rootCommentId,
      })
    );

    return em.save(CommentEntity, comment);
  }
}
