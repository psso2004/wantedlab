import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export default new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "pung",
  password: "pungPassword!23",
  database: "wantedlab",
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  synchronize: false,
  migrations: ["./migrations/*{.ts,.js}"],
  migrationsTableName: "migrations",
  namingStrategy: new SnakeNamingStrategy(),
});
