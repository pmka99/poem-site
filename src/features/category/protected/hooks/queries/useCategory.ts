import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "@/features/category/protected/hooks/keys";
import { categoryService } from "@/features/category/protected/services";


export const useCategory = (categoryId: string) => {
    return useQuery({
        queryKey: categoryKeys.detail(categoryId),
        queryFn: async () => {
            const response = await categoryService.getById(categoryId);
            return response;
        },
        enabled: !!categoryId,
    });
};
