import { Result } from '../../types/result.type';
import { Command } from './command.base';

export const COMMAND_BUS = Symbol('COMMAND_BUS');

export interface CommandBusPort {
  execute<C extends Command, ReturnType>(
    command: C,
  ): Promise<Result<ReturnType, Error>>;
}
