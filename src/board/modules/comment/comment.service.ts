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

  // (공통) EntityManager가 주입되지 않을 경우, 기본 EntityManager를 생성합니다.
  // 이 매개변수는 트랜잭션 내에서 사용되며, 여러 작업을 하나의 트랜잭션으로 묶어야 할 때 사용됩니다.
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

  // visited, 이미 방문한 댓글을 추적하기 위한 Set (순환 참조 방지)
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

    // 댓글이 속할 게시글의 ID 정보를 가져오기 위해 postComments 배열의 첫 번째 항목을 추출합니다.
    // 댓글이 여러 게시글에 한번에 작성될 수 없기 때문에 배열의 첫 번째 항목만 사용합니다. 정책이 변경되면 수정 필요.
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
