import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PostService } from "./post.service";

@Injectable()
export class PostGuard implements CanActivate {
  constructor(private readonly postService: PostService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const input: any = request.body;

    const { id, password } = input;
    if (!id || !password) {
      throw new BadRequestException("post id or password is required");
    }

    const post = await this.postService.getPost({ id });
    if (!post) {
      throw new NotFoundException("post not found");
    }

    const isMatch = await this.postService.comparePassword(
      password,
      post.password
    );
    if (!isMatch) {
      throw new UnauthorizedException("invalid password");
    }

    return true;
  }
}
