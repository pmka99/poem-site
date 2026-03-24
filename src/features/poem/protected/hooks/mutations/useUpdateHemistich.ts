import { useMutation, useQueryClient } from "@tanstack/react-query";
import { poemService } from "@/features/poem/protected/services";
import { poemKeys } from "@/features/poem/protected/hooks/keys";
import { UpdateHemistichDTO } from "@/shared/types/hemistich.type";

export const useUpdateHemistich = (poemId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            hemistichId,
            data,
        }: {
            hemistichId: string;
            data: UpdateHemistichDTO;
        }) => {
            return poemService.updateHemistich(poemId, hemistichId, data);
        },

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: poemKeys.hemistichDetail(poemId, variables.hemistichId),
            });

            queryClient.invalidateQueries({
                queryKey: poemKeys.hemistichLists(poemId),
            });
        },
    });
};

