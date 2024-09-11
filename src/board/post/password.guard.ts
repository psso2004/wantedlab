import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

@Injectable()
export class PasswordGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const input: any = request.body;

    const { id, password } = input;
    if (!id || !password) {
      throw new BadRequestException("post id or password is required");
    }

    // todo: findOne post

    if (password !== "1234") {
      throw new UnauthorizedException("invalid password");
    }

    return true;
  }
}
