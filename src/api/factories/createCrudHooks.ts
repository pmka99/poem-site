import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiResponse } from "@/shared/types/response.type";

type CrudService<T, TCreate, TUpdate> = {
    getAll: () => Promise<ApiResponse<T[]>>;
    getById: (id: string) => Promise<ApiResponse<T>>;
    create: (data: TCreate) => Promise<ApiResponse<T>>;
    update: (id: string, data: TUpdate) => Promise<ApiResponse<T>>;
    delete: (id: string) => Promise<ApiResponse<null>>;
};

export function createCrudHooks<T, TCreate, TUpdate>(
    keys: {
        lists: () => readonly unknown[];
        detail: (id: string) => readonly unknown[];
    },
    getService: () => CrudService<T, TCreate, TUpdate>
) {
    const useList = () => {
        const service = getService();

        return useQuery<ApiResponse<T[]>>({
            queryKey: keys.lists(),
            queryFn: () => service.getAll(),
        });
    };

    const useDetail = (id: string) => {
        const service = getService();

        return useQuery<ApiResponse<T>>({
            queryKey: keys.detail(id),
            queryFn: () => service.getById(id),
            enabled: !!id,
        });
    };

    const useCreate = () => {
        const qc = useQueryClient();
        const service = getService();

        return useMutation({
            mutationFn: (data: TCreate) => service.create(data),
            onSuccess: () => {
                qc.invalidateQueries({ queryKey: keys.lists() });
            },
        });
    };

    const useUpdate = () => {
        const qc = useQueryClient();
        const service = getService();

        return useMutation({
            mutationFn: ({ id, data }: { id: string; data: TUpdate }) =>
                service.update(id, data),

            onSuccess: (_, vars) => {
                qc.invalidateQueries({ queryKey: keys.detail(vars.id) });
                qc.invalidateQueries({ queryKey: keys.lists() });
            },
        });
    };

    const useDelete = () => {
        const qc = useQueryClient();
        const service = getService();

        return useMutation({
            mutationFn: (id: string) => service.delete(id),
            onSuccess: () => {
                qc.invalidateQueries({ queryKey: keys.lists() });
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
