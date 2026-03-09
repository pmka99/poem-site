import { apiClient } from "@/api/core/apiClient";
import { SignInDTO, SignInResponse, SignUpDTO, SignUpResponse } from "@/shared/types/auth.type";
import { ApiResponse } from "@/shared/types/response.type";

export const authService = {

    signUp: (data: SignUpDTO) =>
        apiClient.post<ApiResponse<SignUpResponse>>("/auth/signUp", data),

    signIn: (data: SignInDTO) =>
        apiClient.post<ApiResponse<SignInResponse>>("/auth/signIn", data),

    logout: () =>
        apiClient.post("/auth/logout"),
};
