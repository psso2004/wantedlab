import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const AppDataSource = (configService: ConfigService) =>
  new DataSource({
    type: configService.get<"mysql" | "mariadb">("DB_TYPE", "mysql"),
    host: configService.get<string>("DB_HOST"),
    port: configService.get<number>("DB_PORT"),
    username: configService.get<string>("DB_USERNAME"),
    password: configService.get<string>("DB_PASSWORD"),
    database: configService.get<string>("DB_DATABASE"),
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: false,
    logging: ["error", "query"],
    namingStrategy: new SnakeNamingStrategy(),
  });
