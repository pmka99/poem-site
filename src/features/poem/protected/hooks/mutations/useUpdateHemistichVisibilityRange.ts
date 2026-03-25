import { useMutation, useQueryClient } from "@tanstack/react-query";
import { poemService } from "@/features/poem/protected/services";
import { poemKeys } from "@/features/poem/protected/hooks/keys";
import { VisibiltyRangeHemistichDTO } from "@/shared/types/hemistich.type";

export const useUpdateHemistichVisibilityRange = (poemId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: VisibiltyRangeHemistichDTO) =>
            poemService.updateHemistichVisibilityRange(poemId, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: poemKeys.hemistichLists(poemId),
            });
        },
    });
};
