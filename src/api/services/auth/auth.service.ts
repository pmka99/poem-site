import { apiClient } from "../../core/apiClient";

export const authService = {

    register: (data: {
        username: string;
        phoneNumber: string;
        password: string;
    }) =>
        apiClient.post("/auth/register", data),

    login: (data: {
        phoneNumber: string;
        password: string;
    }) =>
        apiClient.post("/auth/login", data),

    logout: () =>
        apiClient.post("/auth/logout"),
};
