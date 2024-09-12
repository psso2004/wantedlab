import { Injectable } from "@nestjs/common";
import { CommentEntity } from "./entities/comment.entity";
import { DeepPartial, FindManyOptions, FindOptionsWhere } from "typeorm";

@Injectable()
export class CommentService {
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

  createComment(
    createData: DeepPartial<CommentEntity>
  ): Promise<CommentEntity> {
    return null;
  }
}
