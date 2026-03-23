import { useQuery } from "@tanstack/react-query";
import { poemKeys } from "@/features/poem/protected/hooks/keys";
import { poemService } from "@/features/poem/protected/services";


export const usePoem = (poemId: string) => {
    return useQuery({
        queryKey: poemKeys.detail(poemId),
        queryFn: async () => {
            const response = await poemService.getById(poemId);
            return response;
        },
        enabled: !!poemId,
    });
};
