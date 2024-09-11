import { Body, Controller, Delete, Patch, Post } from "@nestjs/common";
import { PostOutputDto } from "./dtos/outputs/post.output.dto";
import { CreatePostInputDto } from "./dtos/inputs/create-post.input.dto";
import { UpdatePostInputDto } from "./dtos/inputs/update-post.input.dto";
import { DeletePostInputDto } from "./dtos/inputs/delete-post.input.dto";

@Controller("post")
export class PostController {
  @Post()
  async createPost(@Body() input: CreatePostInputDto): Promise<PostOutputDto> {
    return null;
  }

  @Patch()
  async updatePost(@Body() input: UpdatePostInputDto): Promise<PostOutputDto> {
    return null;
  }

  @Delete()
  async deletePost(@Body() input: DeletePostInputDto): Promise<void> {
    return null;
  }
}
