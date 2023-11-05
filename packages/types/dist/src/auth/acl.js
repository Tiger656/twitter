"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acl = exports.allowedPermissions = exports.allowedRoles = void 0;
exports.allowedRoles = ['admin', 'regular_user'];
exports.allowedPermissions = [
    'post-create',
    'post-read-all',
    'post-update',
    'post-update-only-self',
    'post-delete',
    'post-delete-only-self',
];
exports.acl = {
    admin: [
        { permission: 'post-create' },
        { permission: 'post-read-all' },
        { permission: 'post-update' },
        { permission: 'post-update-only-self' },
        { permission: 'post-delete' },
        { permission: 'post-delete-only-self' },
    ],
    regular_user: [
        { permission: 'post-create' },
        { permission: 'post-read-all' },
        {
            permission: 'post-update-only-self',
            condition: (requestor, entityId) => {
                return requestor._id.toString() === entityId;
            }
        },
        {
            permission: 'post-delete-only-self',
            condition: (requestor, entityId) => requestor._id.toString() === entityId,
        },
    ],
};
//# sourceMappingURL=acl.js.map