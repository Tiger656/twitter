import { Role } from './acl';
export type JwtPayload = {
    _id: string;
    username: string;
    roles: Role[];
    iat: number;
    exp: number;
};
//# sourceMappingURL=jwt-payload.dto.d.ts.map