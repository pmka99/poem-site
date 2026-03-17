export const queryKeys = {
    auth: {
        all: ["auth"] as const,
        me: () => [...queryKeys.auth.all, "me"] as const,
    },

    users: {
        all: ["users"] as const,
        list: () => [...queryKeys.users.all, "list"] as const,
        detail: (id: string) => [...queryKeys.users.all, "detail", id] as const,
    },

    poems: {
        all: ["poems"] as const,
        list: (params?: any) => [...queryKeys.poems.all, "list", params] as const,
        detail: (id: string) => [...queryKeys.poems.all, "detail", id] as const,
    },

    poemTypes: {
        all: ["poemTypes"] as const,
        list: () => [...queryKeys.poemTypes.all, "list"] as const,
        detail: (id: string) => [...queryKeys.poemTypes.all, "detail", id] as const,
    },

    comments: { all: ["comments"] as const },
};
