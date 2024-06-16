import { Injectable } from '@nestjs/common';
import { TwilioService } from 'nestjs-twilio';
import { TwilioAdaptorOutPort } from '../../domain/port/out/twilio.adaptor.out-port';

@Injectable()
export class TwilioAdaptor implements TwilioAdaptorOutPort {
  constructor(private readonly twilioService: TwilioService) {}

  async send(target: string, message: string) {
    // Send SMS
    this.twilioService.client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: target,
    });
  }
}
