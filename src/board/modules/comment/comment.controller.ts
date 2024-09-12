import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { GetCommentQueryDto } from "./dtos/queries/get-comment.query.dto";
import { CreateCommentInputDto } from "./dtos/inputs/create-comment.input.dto";
import { IPaginated } from "../../dtos/interfaces/paginated.interface";
import { CommentOutputDto } from "./dtos/outputs/comment.output.dto";
import { CommentService } from "./comment.service";
import { PaginatedOutput } from "../../dtos/outputs/paginated.output.dto";

@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getComments(
    @Query() query: GetCommentQueryDto
  ): Promise<IPaginated<CommentOutputDto>> {
    const { page, limit } = query;
    const [comments, total] = await Promise.all([
      this.commentService.getComments(),
      this.commentService.getTotalCommentsCount(),
    ]);
    return PaginatedOutput(CommentOutputDto, comments, total, page, limit);
  }

  @Post()
  createComment(
    @Body() input: CreateCommentInputDto
  ): Promise<CommentOutputDto> {
    return this.commentService.createComment(input);
  }
}
