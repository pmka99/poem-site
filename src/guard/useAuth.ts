import { useQuery } from "@tanstack/react-query";
import { authService } from "@/api/services/auth/auth.service";

export const useAuth = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: () => authService.getUserInfo(),
        retry: false,
    });
};
