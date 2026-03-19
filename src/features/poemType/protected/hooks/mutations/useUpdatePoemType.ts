import { useMutation, useQueryClient } from "@tanstack/react-query";
import { poemTypeService } from "@/features/poemType/protected/services";
import { poemTypeKeys } from "@/features/poemType/protected/hooks/keys";
import type { UpdatePoemTypeDTO } from "@/shared/types/poemType.type";

export const useUpdatePoemType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdatePoemTypeDTO }) => {
            const response = await poemTypeService.update(id, data);
            return response;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: poemTypeKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: poemTypeKeys.list() });
        },
    });
};
