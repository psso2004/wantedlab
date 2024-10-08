import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { GetCommentQueryDto } from "./dtos/queries/get-comment.query.dto";
import { CreateCommentInputDto } from "./dtos/inputs/create-comment.input.dto";
import { IPaginated } from "../../dtos/interfaces/paginated.interface";
import { CommentOutputDto } from "./dtos/outputs/comment.output.dto";
import { CommentService } from "./comment.service";
import { PaginatedOutput } from "../../dtos/outputs/paginated.output.dto";
import { IsNull } from "typeorm";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";

@Controller("comment")
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    @InjectQueue("keyword")
    private readonly keywordQueue: Queue
  ) {}

  @Get()
  async getComments(
    @Query() query: GetCommentQueryDto
  ): Promise<IPaginated<CommentOutputDto>> {
    const { page, limit } = query;

    const where = {
      parentCommentId: IsNull(),
      ...(query.boardPostId && {
        postComments: {
          post: {
            id: query.boardPostId,
          },
        },
      }),
    };
    const [comments, total] = await Promise.all([
      this.commentService.getComments({
        where,
        relations: ["children"],
        relationLoadStrategy: "query",
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.commentService.getTotalCommentsCount(where),
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
        ...(input.boardPostId && {
          postComments: [{ post: { id: input.boardPostId } }],
        }),
      })
    );
    await this.keywordQueue.add("keywordMatch", {
      userName: comment.userName,
      content: comment.content,
    });

    return CommentOutputDto.fromEntity(comment);
  }
}
