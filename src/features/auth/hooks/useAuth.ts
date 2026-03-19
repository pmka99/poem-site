import { useQuery } from "@tanstack/react-query";
import { authService } from "@/features/auth/services";

export const useAuth = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: () => authService.getUserInfo(),
        retry: false,
    });
};
