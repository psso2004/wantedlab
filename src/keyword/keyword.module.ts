import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { KeywordEntity } from "./entities/keyword.entity";
import { KeywordConsumer } from "./keyword.consumer";

@Module({
  imports: [TypeOrmModule.forFeature([KeywordEntity])],
  providers: [KeywordConsumer],
})
export class KeywordModule {}
