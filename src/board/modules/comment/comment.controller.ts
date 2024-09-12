import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { GetCommentQueryDto } from "./dtos/queries/get-comment.query.dto";
import { CreateCommentInputDto } from "./dtos/inputs/create-comment.input.dto";
import { IPaginated } from "../../dtos/interfaces/paginated.interface";
import { CommentOutputDto } from "./dtos/outputs/comment.output.dto";

@Controller("comment")
export class CommentController {
  @Get()
  getComments(
    @Query() query: GetCommentQueryDto
  ): Promise<IPaginated<CommentOutputDto>> {
    return null;
  }

  @Post()
  createComment(
    @Body() input: CreateCommentInputDto
  ): Promise<CommentOutputDto> {
    return null;
  }
}
