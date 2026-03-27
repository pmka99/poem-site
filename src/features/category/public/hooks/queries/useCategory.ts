import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "@/features/category/public/hooks/keys";
import { categoryService } from "@/features/category/public/services";


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
