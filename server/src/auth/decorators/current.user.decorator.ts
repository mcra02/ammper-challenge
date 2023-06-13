import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  ( data: string, context: ExecutionContext ) => {
    const req = context.switchToHttp().getRequest();
    return data ? req.user && req.user[data] : req.user;
  }
);
