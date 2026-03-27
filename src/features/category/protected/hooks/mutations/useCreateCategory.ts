import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/features/category/protected/services";
import { categoryKeys } from "@/features/category/protected/hooks/keys";
import type { CreateCategoryDTO } from "@/shared/types/category.type";


export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateCategoryDTO) => {
            const response = await categoryService.create(data);
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: categoryKeys.list() });
        },
    });
};
