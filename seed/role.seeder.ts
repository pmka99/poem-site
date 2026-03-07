import { RoleName } from '../src/enum/role';
import { Action, Resource } from '../src/enum/permission';
import { RoleModel } from '../src/server/models/role';

export const seedRoles = async () => {
    const roles = [
        {
            name: RoleName.USER, permissions: [
                { resource: Resource.COMMENT, actions: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE] },
                { resource: Resource.USER, actions: [Action.READ, Action.UPDATE, Action.DELETE] },
            ]
            , isSystem: true
        },
        {
            name: RoleName.AUTHOR, permissions: [
                { resource: Resource.COMMENT, actions: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE] },
                { resource: Resource.POEM, actions: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE] },
                { resource: Resource.STORY, actions: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE] },
                { resource: Resource.HEMISTICH, actions: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE] },
            ]
            , isSystem: true
        },
        {
            name: RoleName.ADMIN, permissions: [
                { resource: Resource.ALL, actions: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE] }
            ]
            , isSystem: true
        },
    ];

    for (const role of roles) {
        await RoleModel.updateOne({ name: role.name }, { $setOnInsert: role }, { upsert: true });
    }

    console.log("✅ Roles seeded successfully");
};