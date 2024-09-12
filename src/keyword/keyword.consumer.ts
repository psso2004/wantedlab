import { Injectable } from "@nestjs/common";
import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";

@Injectable()
@Processor("keyword")
export class KeywordConsumer extends WorkerHost {
  async process(job: Job): Promise<void> {
    console.log(job.data);
  }

  @OnWorkerEvent("completed")
  onCompleted() {
    console.log("성공했어요!!");
  }

  @OnWorkerEvent("failed")
  onFailed() {
    console.log("실패했어요!!!");
  }
}
