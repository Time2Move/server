export interface TwilioAdaptorOutPort {
  send(target: string, message: string): Promise<void>;
}
