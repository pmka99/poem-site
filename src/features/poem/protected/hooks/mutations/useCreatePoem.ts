import { useMutation, useQueryClient } from "@tanstack/react-query";
import { poemService } from "@/features/poem/protected/services";
import { poemKeys } from "@/features/poem/protected/hooks/keys";
import type { CreatePoemDTO } from "@/shared/types/poem.type";


export const useCreatePoem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreatePoemDTO) => {
            const response = await poemService.create(data);
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: poemKeys.list() });
        },
    });
};
