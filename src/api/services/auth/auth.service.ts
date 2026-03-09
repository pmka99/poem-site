import { apiClient } from "@/api/core/apiClient";
import { SignInDTO, SignUpDTO } from "@/shared/dto/auth.dto";

export const authService = {

    signUp: (data: SignUpDTO) =>
        apiClient.post("/auth/signUp", data),

    signIn: (data: SignInDTO) =>
        apiClient.post("/auth/signIn", data),

    logout: () =>
        apiClient.post("/auth/logout"),
};
