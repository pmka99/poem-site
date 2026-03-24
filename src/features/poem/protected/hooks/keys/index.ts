export const poemKeys = {
    all: ["poem"] as const,

    lists: () => [...poemKeys.all, "list"] as const,
    list: (params?: any) => [...poemKeys.lists(), params] as const,

    details: () => [...poemKeys.all, "detail"] as const,
    detail: (id: string) => [...poemKeys.details(), id] as const,

    hemistichs: (poemId: string) =>
        [...poemKeys.all, poemId, "hemistichs"] as const,

    hemistichLists: (poemId: string) =>
        [...poemKeys.hemistichs(poemId), "list"] as const,

    hemistichList: (poemId: string, params?: any) =>
        [...poemKeys.hemistichLists(poemId), params] as const,

    hemistichDetail: (poemId: string, hemistichId: string) =>
        [...poemKeys.hemistichs(poemId), "detail", hemistichId] as const,
};
