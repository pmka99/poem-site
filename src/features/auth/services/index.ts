import { authApi } from "@features/auth/api";
import {
    SignInDTO,
    SignInResponse,
    SignUpDTO,
    SignUpResponse,
    UserInfoResponse,
} from "@/shared/types/auth.type";
import { ApiResponse } from "@/shared/types/response.type";

export const authService = {
    async signUp(data: SignUpDTO): Promise<ApiResponse<SignUpResponse>> {
        const res = await authApi.signUp(data);
        return res;
    },

    async signIn(data: SignInDTO): Promise<ApiResponse<SignInResponse>> {
        const res = await authApi.signIn(data);
        return res;
    },

    async getUserInfo(): Promise<ApiResponse<UserInfoResponse>> {
        const res = await authApi.getUserInfo();
        return res
    },

    async logout(): Promise<ApiResponse<null>> {
        const res = await authApi.logout();
        return res;
    },
};
