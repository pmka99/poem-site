import { RoleName } from '../src/enum/role';
import { RoleModel } from '../src/server/models/role';

export const seedRoles = async () => {
    const roles = [
        { name: RoleName["USER"], permissions: [{ resource: "profile", actions: ["read", "update"] }], isSystem: true },
        { name: RoleName["AUTHOR"], permissions: [{ resource: "post", actions: ["create", "read", "update"] }], isSystem: true },
        { name: RoleName["ADMIN"], permissions: [{ resource: "*", actions: ["create", "read", "update", "delete"] }], isSystem: true },
    ];

    for (const role of roles) {
        await RoleModel.updateOne({ name: role.name }, { $setOnInsert: role }, { upsert: true });
    }

    console.log("✅ Roles seeded successfully");
};