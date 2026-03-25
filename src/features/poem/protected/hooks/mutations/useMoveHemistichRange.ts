import { useMutation, useQueryClient } from "@tanstack/react-query";
import { poemService } from "@/features/poem/protected/services";
import { poemKeys } from "@/features/poem/protected/hooks/keys";
import { MoveRangeHemistichDTO } from "@/shared/types/hemistich.type";

export const useMoveHemistichRange = (poemId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: MoveRangeHemistichDTO) =>
            poemService.moveHemistichRange(poemId, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: poemKeys.hemistichLists(poemId),
            });
        },
    });
};
