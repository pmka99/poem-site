import { useQuery } from "@tanstack/react-query";
import { poemTypeKeys } from "@/features/poemType/protected/hooks/keys";
import { poemTypeService } from "@/features/poemType/protected/services";


export const usePoemType = (poemTypeId: string) => {
    return useQuery({
        queryKey: poemTypeKeys.detail(poemTypeId),
        queryFn: async () => {
            const response = await poemTypeService.getById(poemTypeId);
            return response;
        },
        enabled: !!poemTypeId,
    });
};
