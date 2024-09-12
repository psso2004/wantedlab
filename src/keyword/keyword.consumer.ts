import { Injectable } from "@nestjs/common";
import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { KeywordService } from "./keyword.service";
import { NotificationService } from "../notification/notification.service";

@Injectable()
@Processor("keyword")
export class KeywordConsumer extends WorkerHost {
  constructor(
    private readonly keywordService: KeywordService,
    private readonly notificationService: NotificationService
  ) {
    super();
  }

  async process(job: Job): Promise<void> {
    const count = await this.keywordService.getKeywordMatchCount(job.data);
    if (count > 0) {
      await this.notificationService.sendNotification();
    }
  }

  @OnWorkerEvent("failed")
  async onFailed(job: Job) {
    console.log(
      `${JSON.stringify(job.data)} 키워드 알림 전송 실패(재시도 중 ${
        job.attemptsMade
      })`
    );
  }
}
