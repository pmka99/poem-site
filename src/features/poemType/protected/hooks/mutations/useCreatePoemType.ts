import { useMutation, useQueryClient } from "@tanstack/react-query";
import { poemTypeService } from "@/features/poemType/protected/services";
import { poemTypeKeys } from "@/features/poemType/protected/hooks/keys";
import type { CreatePoemTypeDTO } from "@/shared/types/poemType.type";


export const useCreatePoemType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreatePoemTypeDTO) => {
            const response = await poemTypeService.create(data);
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: poemTypeKeys.list() });
        },
    });
};
