import bcrypt from "bcrypt";
import { UserModel } from "../server/models/user";
import { IRole, RoleModel } from '../server/models/role';

export const seedUsers = async () => {
    const existingAdmin = await UserModel.findOne({
        phoneNumber: process.env.ADMIN_PHONE_NUMBER,
    });

    if (existingAdmin) {
        console.log("⚠️ Admin already exists");
        return;
    }

    if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_PHONE_NUMBER) {
        console.error("❌ Admin credentials are not fully set in environment variables");
        return;
    }
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const adminRole: IRole | null = await RoleModel.findOne({ name: "admin" });
    if (!adminRole) {
        console.error("❌ Admin role not found. Please seed roles first.");
        return;
    }

    await UserModel.create({
        username: process.env.ADMIN_USERNAME,
        phoneNumber: process.env.ADMIN_PHONE_NUMBER,
        password: hashedPassword,
        role: adminRole._id,
        isActive: true,
    });

    console.log("✅ Admin user seeded successfully");
};