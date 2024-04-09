import { Injectable } from '@nestjs/common';
import { TwilioService } from 'nestjs-twilio';
@Injectable()
export class SmsService {
  constructor(private readonly twilioService: TwilioService) {}

  async send(target: string, message: string) {
    // Send SMS
    const sms = await this.twilioService.client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: target,
    });
    switch (sms.status) {
      case 'queued':
      case 'accepted':
      case 'scheduled':
      case 'sending':
      case 'sent':
      case 'delivered':
        return true;
      default:
        return false;
    }
  }
}
