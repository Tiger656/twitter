import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestWithJwtPayload } from '../request-with-jwtpayload.type';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from '../../../../../packages/types/src/auth/jwt-payload.dto';
import { Permission, Role, acl } from '../../../../../packages/types/src/auth/acl';

//I keep it because it is an interesting idea for authorization, but at this moment I don't see a way it can be developed.
@Injectable()
export class AuthzGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const permission = this.reflector.get<Permission>(
      'permission',
      context.getHandler(),
    ) as Permission;
    if (!permission) {
      return true;
    }
    const request = context
      .switchToHttp()
      .getRequest() as RequestWithJwtPayload;
    console.log(request.jwtPayload)
    return this.canI(request.jwtPayload, permission, "null");
  }

  canI(requestor: JwtPayload, permission: Permission, entityId: string) {
    console.log(requestor)
    for (const role of requestor.roles) {
      const permisisonInRole = acl[role].find(
        (el) => el.permission === permission,
      );
      if (!permisisonInRole) continue;
      if (!permisisonInRole.condition) return true;
      //if (permisisonInRole.condition(requestor, entityId)) return true;
    }
    return false;
  }
}
