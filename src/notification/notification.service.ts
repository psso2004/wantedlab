import { Injectable } from "@nestjs/common";

@Injectable()
export class NotificationService {
  async sendNotification(): Promise<void> {
    console.log("키워드 알림 전송 완료.");
  }
}
