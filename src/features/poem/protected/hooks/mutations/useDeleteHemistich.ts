import { useMutation, useQueryClient } from "@tanstack/react-query";
import { poemService } from "@/features/poem/protected/services";
import { poemKeys } from "@/features/poem/protected/hooks/keys";

export const useDeleteHemistich = (poemId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (hemistichId: string) => {
            return poemService.deleteHemistich(poemId, hemistichId);
        },

        onSuccess: (_, hemistichId) => {
            queryClient.invalidateQueries({
                queryKey: poemKeys.hemistichLists(poemId),
            });

            queryClient.removeQueries({
                queryKey: poemKeys.hemistichDetail(poemId, hemistichId),
            });
        },
    });
};

