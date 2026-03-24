import { useQuery } from "@tanstack/react-query";
import { poemService } from "@/features/poem/protected/services";
import { poemKeys } from "@/features/poem/protected/hooks/keys";

export const usePoems = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: poemKeys.list(params),
        queryFn: async () => {
            const response = await poemService.getAll(params);
            return response;
        },
        staleTime: 1000 * 60 * 5,
    });
};
