import { PrismaModule } from "@/prisma/prisma.module"
import { RabbitmqModule } from "@/rabbitmq/rabbitmq.module"
import { RatelimitGuard } from "@/ratelimit/ratelimit.guard"
import { RatelimitModule } from "@/ratelimit/ratelimit.module"
import { RedisModule } from "@/redis/redis.module"
import { SupabaseModule } from "@/supabase/supabase.module"
import { TrpcModule } from "@/trpc/trpc.module"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { APP_GUARD } from "@nestjs/core"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    SupabaseModule,
    TrpcModule,
    RedisModule,
    RatelimitModule,
    RabbitmqModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RatelimitGuard,
    },
  ],
})
export class AppModule {}
