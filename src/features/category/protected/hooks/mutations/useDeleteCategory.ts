import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/features/category/protected/services";
import { categoryKeys } from "@/features/category/protected/hooks/keys";

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await categoryService.delete(id);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: categoryKeys.list() });
        },
    });
};
