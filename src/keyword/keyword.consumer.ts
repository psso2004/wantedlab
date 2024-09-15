import { Injectable } from "@nestjs/common";
import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { KeywordService } from "./keyword.service";
import { NotificationService } from "../notification/notification.service";
import { In } from "typeorm";

/**
 * KeywordConsumer는 BullMQ 큐에서 'keyword' 큐의 작업을 처리하는 consumer입니다.
 * 키워드와 관련된 작업을 처리하고 알림을 전송합니다.
 */
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
    const matchKeywords = await this.keywordService.getMatchKeywords(
      job.data.content
    );

    if (matchKeywords.length > 0) {
      const keywordEntities = await this.keywordService.getKeywords({
        where: {
          keyword: In(matchKeywords),
        },
      });
      const userNames = keywordEntities.map(({ userName }) => userName);
      await this.notificationService.sendNotification(userNames);
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
