import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtPayload } from '../../../../../packages/types/src/auth/jwt-payload.dto';
import { RequestWithJwtPayload } from '../request-with-jwtpayload.type';

export const JwtPayloadFromRequest = createParamDecorator(
  (data: unknown, context: ExecutionContext): JwtPayload => {
    const request = context
      .switchToHttp()
      .getRequest() as RequestWithJwtPayload;
    return request.jwtPayload;
  },
);
