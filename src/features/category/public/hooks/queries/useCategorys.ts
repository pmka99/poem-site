import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/features/category/public/services";
import { categoryKeys } from "@/features/category/public/hooks/keys";

export const useCategorys = () => {
    return useQuery({
        queryKey: categoryKeys.list(),
        queryFn: async () => {
            const response = await categoryService.getAll();
            return response;
        },
        staleTime: 1000 * 60 * 5,
    });
};
