export const createQueryKeys = (model: string) => ({
    all: [model] as const,

    lists: () => [...createQueryKeys(model).all, "list"] as const,

    list: (filters?: any) =>
        [...createQueryKeys(model).lists(), filters] as const,

    details: () => [...createQueryKeys(model).all, "detail"] as const,

    detail: (id: string) =>
        [...createQueryKeys(model).details(), id] as const,
});
