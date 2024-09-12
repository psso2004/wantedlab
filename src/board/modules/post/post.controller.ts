import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { PostOutputDto } from "./dtos/outputs/post.output.dto";
import { CreatePostInputDto } from "./dtos/inputs/create-post.input.dto";
import { UpdatePostInputDto } from "./dtos/inputs/update-post.input.dto";
import { DeletePostInputDto } from "./dtos/inputs/delete-post.input.dto";
import { PasswordGuard } from "./password.guard";
import { DataSource } from "typeorm";
import { PostEntity } from "./entities/post.entity";
import { PaginatedOutput } from "../../dtos/outputs/paginated.output.dto";
import { IPaginated } from "../../dtos/interfaces/paginated.interface";
import { GetPostQueryDto } from "./dtos/queries/get-post.query.dto";

@Controller("post")
export class PostController {
  constructor(private readonly dataSource: DataSource) {}

  @Get()
  async getPosts(
    @Query() query: GetPostQueryDto
  ): Promise<IPaginated<PostOutputDto>> {
    const { page, limit } = query;
    const repo = this.dataSource.getRepository(PostEntity);
    const [posts, total] = await Promise.all([repo.find(), repo.count()]);
    return PaginatedOutput(PostOutputDto, posts, total, page, limit);
  }

  @Post()
  async createPost(@Body() input: CreatePostInputDto): Promise<PostOutputDto> {
    return null;
  }

  @UseGuards(PasswordGuard)
  @Patch()
  async updatePost(@Body() input: UpdatePostInputDto): Promise<PostOutputDto> {
    return null;
  }

  @UseGuards(PasswordGuard)
  @Delete()
  async deletePost(@Body() input: DeletePostInputDto): Promise<void> {
    return null;
  }
}
