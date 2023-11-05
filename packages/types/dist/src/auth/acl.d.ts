import { JwtPayload } from "./jwt-payload.dto";
export declare const allowedRoles: readonly ["admin", "regular_user"];
export type Role = (typeof allowedRoles)[number];
export declare const allowedPermissions: readonly ["post-create", "post-read-all", "post-update", "post-update-only-self", "post-delete", "post-delete-only-self"];
export type Permission = (typeof allowedPermissions)[number];
export type ACLEntry = {
    permission: Permission;
    condition?: (requestor: JwtPayload, entityId: string) => boolean;
};
export declare const acl: Record<Role, Array<ACLEntry>>;
//# sourceMappingURL=acl.d.ts.map