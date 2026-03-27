import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/features/category/protected/services";
import { categoryKeys } from "@/features/category/protected/hooks/keys";
import type { UpdateCategoryDTO } from "@/shared/types/category.type";

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateCategoryDTO }) => {
            const response = await categoryService.update(id, data);
            return response;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: categoryKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: categoryKeys.list() });
        },
    });
};
