import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common"
import { RatelimitService } from "./ratelimit.service"

@Injectable()
export class RatelimitGuard implements CanActivate {
  constructor(private readonly ratelimitService: RatelimitService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const identifier: string = request.ip || "anonymous"

    const isAllowed = await this.ratelimitService.limit(identifier)

    if (!isAllowed) {
      throw new HttpException("Too Many Requests", HttpStatus.TOO_MANY_REQUESTS)
    }

    return true
  }
}
