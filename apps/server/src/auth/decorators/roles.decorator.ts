import { SetMetadata } from '@nestjs/common';
import { ACLEntry, Permission } from '../../../../../packages/types/src/auth/acl';

export const GuardPermission = (permission: Permission[]) =>
  SetMetadata('permission', permission);

// export const GuardPermission = (permission: ComplexPermission) =>
//   SetMetadata('permission', permission);

// export type ComplexPermission = {
//   permission: Permission;
//   enityId?: string;
// };
