import { Injectable } from "@nestjs/common";

@Injectable()
export class NotificationService {
  async sendNotification(userNames: string[]): Promise<void> {
    console.log(`${userNames} 키워드 알림 전송 완료.`);
  }
}
