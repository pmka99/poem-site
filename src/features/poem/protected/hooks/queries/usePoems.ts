import { useQuery } from "@tanstack/react-query";
import { poemService } from "@/features/poem/protected/services";
import { poemKeys } from "@/features/poem/protected/hooks/keys";

export const usePoems = () => {
    return useQuery({
        queryKey: poemKeys.list(),
        queryFn: async () => {
            const response = await poemService.getAll();
            return response;
        },
        staleTime: 1000 * 60 * 5,
    });
};
