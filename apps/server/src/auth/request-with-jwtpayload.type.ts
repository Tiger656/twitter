import { JwtPayload } from '../../../../packages/types/src/auth/jwt-payload.dto';

export interface RequestWithJwtPayload extends Request {
  jwtPayload: JwtPayload;
}
