export const categoryKeys = {
    all: ["categories"] as const,

    list: () => [...categoryKeys.all, "list"] as const,

    detail: (id: string) => [...categoryKeys.all, "detail", id] as const,
};
