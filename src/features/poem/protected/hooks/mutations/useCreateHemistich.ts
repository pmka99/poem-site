import { useMutation, useQueryClient } from "@tanstack/react-query";
import { poemService } from "@/features/poem/protected/services";
import { poemKeys } from "@/features/poem/protected/hooks/keys";
import { CreateHemistichDTO } from "@/shared/types/hemistich.type";


export const useCreateHemistich = (poemId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateHemistichDTO) => {
            return poemService.createHemistich(poemId, data);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: poemKeys.hemistichLists(poemId),
            });
        },
    });
};

