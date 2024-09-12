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
import { PaginatedOutput } from "../../dtos/outputs/paginated.output.dto";
import { IPaginated } from "../../dtos/interfaces/paginated.interface";
import { GetPostQueryDto } from "./dtos/queries/get-post.query.dto";
import { PostService } from "./post.service";

@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPosts(
    @Query() query: GetPostQueryDto
  ): Promise<IPaginated<PostOutputDto>> {
    const { page, limit } = query;
    const [posts, total] = await Promise.all([
      this.postService.getPosts(),
      this.postService.getTotalPostsCount(),
    ]);
    return PaginatedOutput(PostOutputDto, posts, total, page, limit);
  }

  @Post()
  async createPost(@Body() input: CreatePostInputDto): Promise<PostOutputDto> {
    const post = await this.postService.createPost(input);
    return PostOutputDto.fromEntity(post);
  }

  @UseGuards(PasswordGuard)
  @Patch()
  async updatePost(@Body() input: UpdatePostInputDto): Promise<PostOutputDto> {
    const post = await this.postService.updatePost(input);
    return PostOutputDto.fromEntity(post);
  }

  @UseGuards(PasswordGuard)
  @Delete()
  async deletePost(@Body() input: DeletePostInputDto): Promise<void> {
    const { id } = input;
    return this.postService.deletePost(id);
  }
}
