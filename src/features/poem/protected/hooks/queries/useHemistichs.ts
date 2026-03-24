import { useQuery } from "@tanstack/react-query";
import { poemService } from "@/features/poem/protected/services";
import { poemKeys } from "@/features/poem/protected/hooks/keys";

export const useHemistichs = (poemId: string, params?: Record<string, any>) =>
    useQuery({
        queryKey: poemKeys.hemistichList(poemId, params),
        queryFn: () => poemService.getAllHemistichs(poemId, params),
        enabled: !!poemId,
    });