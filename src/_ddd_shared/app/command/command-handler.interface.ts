import { Result } from '../../types/result.type';

export interface CommandHandler<Command, ReturnType> {
  execute(command: Command): Promise<Result<ReturnType, Error>>;
}
