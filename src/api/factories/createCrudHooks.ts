import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { ApiResponse } from "@/shared/types/response.type";

type CrudService<T, TCreate, TUpdate> = {
    getAll: () => Promise<ApiResponse<T[]>>;
    getById: (id: string) => Promise<ApiResponse<T>>;
    create: (data: TCreate) => Promise<ApiResponse<T>>;
    update: (id: string, data: TUpdate) => Promise<ApiResponse<T>>;
    delete: (id: string) => Promise<ApiResponse<null>>;
};

export function createCrudHooks<
    T,
    TCreate,
    TUpdate
>(
    keys: {
        lists: () => readonly unknown[];
        list: (filters?: any) => readonly unknown[];
        detail: (id: string) => readonly unknown[];
    },
    service: CrudService<T, TCreate, TUpdate>
) {
    const useList = () =>
        useQuery<ApiResponse<T[]>>({
            queryKey: keys.lists(),
            queryFn: service.getAll,
        });

    const useDetail = (id: string) =>
        useQuery<ApiResponse<T>>({
            queryKey: keys.detail(id),
            queryFn: () => service.getById(id),
            enabled: !!id,
        });

    const useCreate = () => {
        const qc = useQueryClient();

        return useMutation<ApiResponse<T>, unknown, TCreate>({
            mutationFn: service.create,
            onSuccess: () => {
                qc.invalidateQueries({
                    queryKey: keys.lists(),
                });
            },
        });
    };

    const useUpdate = () => {
        const qc = useQueryClient();

        return useMutation<
            ApiResponse<T>,
            unknown,
            { id: string; data: TUpdate }
        >({
            mutationFn: ({ id, data }) =>
                service.update(id, data),

            onSuccess: (_, variables) => {
                qc.invalidateQueries({
                    queryKey: keys.detail(variables.id),
                });

                qc.invalidateQueries({
                    queryKey: keys.lists(),
                });
            },
        });
    };

    const useDelete = () => {
        const qc = useQueryClient();

        return useMutation<
            ApiResponse<null>,
            unknown,
            string
        >({
            mutationFn: service.delete,

            onSuccess: () => {
                qc.invalidateQueries({
                    queryKey: keys.lists(),
                });
            },
        });
    };

    return {
        useList,
        useDetail,
        useCreate,
        useUpdate,
        useDelete,
    };
}
