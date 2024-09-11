import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppDataSource } from "./data-source";
import { BoardModule } from "./board/board.module";
import { KeywordModule } from "./keyword/keyword.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dataSource = AppDataSource(configService);
        return dataSource.options;
      },
      inject: [ConfigService],
    }),
    BoardModule,
    KeywordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
