import { useMutation, useQueryClient } from "@tanstack/react-query";
import { poemService } from "@/features/poem/protected/services";
import { poemKeys } from "@/features/poem/protected/hooks/keys";
import type { UpdatePoemDTO } from "@/shared/types/poem.type";

export const useUpdatePoem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdatePoemDTO }) => {
            const response = await poemService.update(id, data);
            return response;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: poemKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: poemKeys.list() });
        },
    });
};
