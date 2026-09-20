import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private readonly gateway: NotificationsGateway,
    private readonly config: ConfigService,
  ) {}

  async sendPush(userId: string, title: string, body: string): Promise<void> {
    // TODO: publish to SNS topic → APNs / FCM via AWS SDK
    this.logger.log(`Push to ${userId}: ${title} — ${body}`);
  }

  async sendInApp(userId: string, event: string, payload: any): Promise<void> {
    this.gateway.sendToUser(userId, event, payload);
  }
}
