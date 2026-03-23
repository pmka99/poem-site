import { apiClient } from "@/api/core/apiClient";
import {
    SignInDTO,
    SignInResponse,
    SignUpDTO,
    SignUpResponse,
    UserInfoResponse,
} from "@/shared/types/auth.type";
import { ApiResponse } from "@/shared/types/response.type";

export const authApi = {
    signUp: (data: SignUpDTO) =>
        apiClient.post<ApiResponse<SignUpResponse>>("/auth/signUp", data),

    signIn: (data: SignInDTO) =>
        apiClient.post<ApiResponse<SignInResponse>>("/auth/signIn", data),

    getUserInfo: () =>
        apiClient.get<ApiResponse<UserInfoResponse>>("/auth/userInfo"),

    logout: () =>
        apiClient.post<ApiResponse<null>>("/auth/logout"),
};
