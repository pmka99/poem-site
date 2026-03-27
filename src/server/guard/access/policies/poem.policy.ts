import { IPolicy } from "./IPolicy";
import { ResourceContext } from "../types";
import PoemModel, { IPoem } from "@server/models/poem";
import { AuthUser } from "../../utils/getUserFromRequest";
import { Action, Resource } from "@/enum/permission";
import { RoleName } from "@/enum/role";

export class PoemPolicy implements IPolicy {
    resource = Resource.POEM;

    async canAccess(user: AuthUser, action: Action, context: ResourceContext) {

        if (action === Action.CREATE) return true;

        const poemId = context.params?.poemId || context.params?.id;
        if (!poemId) return false;

        const poem: IPoem | null = await PoemModel.findById(poemId).lean();
        if (!poem) return false;

        // author owns poem
        if (poem.author.toString() === user._id.toString()) {
            return true;
        }

        return false;
    }
}

export function getPoemReadFilter(user: AuthUser | null) {
    if (!user) {
        return { show: true };
    }

    if (user.role === RoleName.ADMIN) {
        return {};
    }

    return {
        $or: [
            { show: true },
            { author: user._id }
        ]
    };
}


export function getPoemPopulate(user: AuthUser | null) {
    if (!user) {
        return [
            {
                path: "poemType",
                select: "name _id"
            },
            {
                path: "category",
                select: "title _id"
            }
        ];
    }

    if (user.role === RoleName.ADMIN) {
        return [
            { path: "poemType" },
            { path: "author", select: "name _id" }
        ];
    }

    return [
        { path: "poemType" },
        {
            path: "category",
            select: "title _id"
        },
        { path: "author", select: "name _id" }
    ];
}

