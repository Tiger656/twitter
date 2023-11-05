import { JwtPayload } from "./jwt-payload.dto";


export const allowedRoles = ['admin', 'regular_user'] as const;
export type Role = (typeof allowedRoles)[number];


export const allowedPermissions = [
  'post-create',
  'post-read-all',
  'post-update',
  'post-update-only-self',
  'post-delete',
  'post-delete-only-self',
  //'create-users',
  // 'read-users',
  // 'update-users',
  // 'delete-users',
  // 'find-all-users',
  // 'find-user',
  // 'delete-posts',
  // 'update-posts'
] as const;
export type Permission = (typeof allowedPermissions)[number];

export type ACLEntry = {
  permission: Permission;
  condition?: (requestor: JwtPayload, entityId: string) => boolean;
};

export const acl: Record<Role, Array<ACLEntry>> = {
  admin: [
    { permission: 'post-create' },
    { permission: 'post-read-all' },
    { permission: 'post-update' },
    { permission: 'post-update-only-self' },
    { permission: 'post-delete' },
    { permission: 'post-delete-only-self' },
    // { permission: 'read-users' },
    // { permission: 'update-users' },
    // { permission: 'delete-users' },
    // { permission: 'find-all-users' },
    // { permission: 'find-user' },
  ],
  regular_user: [
    { permission: 'post-create' },
    { permission: 'post-read-all' },
    {
      permission: 'post-update-only-self',
      condition: (requestor, entityId: string) => {
        return requestor._id.toString() === entityId;
      }
    },
    {
      permission: 'post-delete-only-self',
      condition: (requestor, entityId: string) =>
        requestor._id.toString() === entityId,
    }, // Add user premissions;
  ],
};
