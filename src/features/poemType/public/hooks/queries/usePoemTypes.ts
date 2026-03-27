import { useQuery } from "@tanstack/react-query";
import { poemTypeService } from "@/features/poemType/public/services";
import { poemTypeKeys } from "@/features/poemType/public/hooks/keys";

export const usePoemTypes = () => {
    return useQuery({
        queryKey: poemTypeKeys.list(),
        queryFn: async () => {
            const response = await poemTypeService.getAll();
            return response;
        },
        staleTime: 1000 * 60 * 5,
    });
};
