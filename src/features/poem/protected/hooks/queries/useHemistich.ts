import { useQuery } from "@tanstack/react-query";
import { poemService } from "@/features/poem/protected/services";
import { poemKeys } from "@/features/poem/protected/hooks/keys";

export const useHemistich = (poemId: string, hemistichId: string) =>
    useQuery({
        queryKey: poemKeys.hemistichDetail(poemId, hemistichId),
        queryFn: () => poemService.getHemistichById(poemId, hemistichId),
        enabled: !!poemId && !!hemistichId,
    });