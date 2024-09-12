import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { GetCommentQueryDto } from "./dtos/queries/get-comment.query.dto";
import { CreateCommentInputDto } from "./dtos/inputs/create-comment.input.dto";
import { IPaginated } from "../../dtos/interfaces/paginated.interface";
import { CommentOutputDto } from "./dtos/outputs/comment.output.dto";
import { CommentService } from "./comment.service";
import { PaginatedOutput } from "../../dtos/outputs/paginated.output.dto";
import { IsNull } from "typeorm";

@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getComments(
    @Query() query: GetCommentQueryDto
  ): Promise<IPaginated<CommentOutputDto>> {
    const { page, limit } = query;
    const [comments, total] = await Promise.all([
      this.commentService.getComments({
        where: {
          parentCommentId: IsNull(),
        },
        relations: ["children"],
        relationLoadStrategy: "query",
      }),
      this.commentService.getTotalCommentsCount({
        parentCommentId: IsNull(),
      }),
    ]);

    await Promise.all(
      comments.map(async (comment) => {
        await this.commentService.loadChildren(comment);
      })
    );
    return PaginatedOutput(CommentOutputDto, comments, total, page, limit);
  }

  @Post()
  async createComment(
    @Body() input: CreateCommentInputDto
  ): Promise<CommentOutputDto> {
    const comment = await this.commentService.createComment(
      Object.assign(input, {
        postComments: [{ post: { id: input.boardId } }],
      })
    );
    return CommentOutputDto.fromEntity(comment);
  }
}
