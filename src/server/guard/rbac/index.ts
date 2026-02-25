import mongoose from "mongoose";
// import PermissionModel from "@/server/models/permission"; // فرض permission collection

/**
 * Check if user has the specified permission
 */
export async function checkPermission(userId: string, permissionName: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(userId)) return false;

    // const permission = await PermissionModel.findOne({ user: userId, name: permissionName }).lean();
    // return !!permission;
}