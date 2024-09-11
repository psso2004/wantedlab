import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { KeywordEntity } from "./entities/keyword.entity";

@Module({
  imports: [TypeOrmModule.forFeature([KeywordEntity])],
})
export class KeywordModule {}
