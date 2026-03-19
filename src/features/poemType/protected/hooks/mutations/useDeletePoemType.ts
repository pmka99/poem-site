import { useMutation, useQueryClient } from "@tanstack/react-query";
import { poemTypeService } from "@/features/poemType/protected/services";
import { poemTypeKeys } from "@/features/poemType/protected/hooks/keys";

export const useDeletePoemType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await poemTypeService.delete(id);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: poemTypeKeys.list() });
        },
    });
};
