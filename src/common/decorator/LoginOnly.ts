import { AuthGuard } from '@/auth/guard/auth.guard';
import { UseGuards, applyDecorators } from '@nestjs/common';

/**
 * login only decorator
 */
export function LoginOnly() {
  return applyDecorators(UseGuards(AuthGuard));
}
