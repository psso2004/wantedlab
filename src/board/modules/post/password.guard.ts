import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity } from "./entities/post.entity";
import { Repository } from "typeorm";

@Injectable()
export class PasswordGuard implements CanActivate {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const input: any = request.body;

    const { id, password } = input;
    if (!id || !password) {
      throw new BadRequestException("post id or password is required");
    }

    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new BadRequestException("post not found");
    }

    // todo: password hash
    if (password !== post.password) {
      throw new UnauthorizedException("invalid password");
    }

    return true;
  }
}
