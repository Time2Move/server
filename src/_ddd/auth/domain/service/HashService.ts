import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashPort } from '../port/out/hashPassword.port';

@Injectable()
export class HashService implements HashPort {
  constructor() {}

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, await bcrypt.genSalt());
  }
  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
