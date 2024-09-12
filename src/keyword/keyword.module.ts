import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { KeywordEntity } from "./entities/keyword.entity";
import { KeywordConsumer } from "./keyword.consumer";
import { KeywordService } from "./keyword.service";
import { NotificationModule } from "../notification/notification.module";

@Module({
  imports: [TypeOrmModule.forFeature([KeywordEntity]), NotificationModule],
  providers: [KeywordConsumer, KeywordService],
})
export class KeywordModule {}
