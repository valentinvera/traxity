import { RedisService } from "@/redis/redis.service"
import { Injectable } from "@nestjs/common"
import { Ratelimit } from "@upstash/ratelimit"

@Injectable()
export class RatelimitService {
  private ratelimiter: Ratelimit

  constructor(private readonly redisService: RedisService) {
    const redis = this.redisService.getClient()

    this.ratelimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "10 s"),
      prefix: "@upstash/ratelimit",
      analytics: true,
    })
  }

  async limit(identifier: string): Promise<boolean> {
    const { success } = await this.ratelimiter.limit(identifier)
    return success
  }
}
