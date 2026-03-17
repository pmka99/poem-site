import { createQueryKeys } from "./createQueryKeys";

const authKeys = {
    all: ["auth"] as const,
    me: () => [...authKeys.all, "me"] as const,
};

export const queryKeys = {
    auth: authKeys,

    users: createQueryKeys("users"),
    poems: createQueryKeys("poems"),
    poemTypes: createQueryKeys("poemTypes"),
    comments: createQueryKeys("comments"),
};
