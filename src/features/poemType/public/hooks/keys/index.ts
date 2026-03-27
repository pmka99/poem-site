export const poemTypeKeys = {
    all: ["poem-types"] as const,

    list: () => [...poemTypeKeys.all, "list"] as const,

    detail: (id: string) => [...poemTypeKeys.all, "detail", id] as const,
};
