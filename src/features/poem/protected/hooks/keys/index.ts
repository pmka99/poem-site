export const poemKeys = {
    all: ["poem"] as const,

    list: () => [...poemKeys.all, "list"] as const,

    detail: (id: string) => [...poemKeys.all, "detail", id] as const,
};
