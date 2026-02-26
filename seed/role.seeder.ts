import { RoleModel } from '../server/models/role';

export const seedRoles = async () => {
    const roles = [
        { name: "user", permissions: [{ resource: "profile", actions: ["read", "update"] }], isSystem: true },
        { name: "author", permissions: [{ resource: "post", actions: ["create", "read", "update"] }], isSystem: true },
        { name: "admin", permissions: [{ resource: "*", actions: ["create", "read", "update", "delete"] }], isSystem: true },
    ];

    for (const role of roles) {
        await RoleModel.updateOne({ name: role.name }, { $setOnInsert: role }, { upsert: true });
    }

    console.log("✅ Roles seeded successfully");
};