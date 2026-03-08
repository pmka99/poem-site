import { baseFetch } from "./baseFetch";

export const apiClient = {

    get: <T>(url: string, options?: RequestInit) =>
        baseFetch<T>(url, { ...options, method: "GET" }),

    post: <T>(url: string, body?: unknown, options?: RequestInit) =>
        baseFetch<T>(url, {
            ...options,
            method: "POST",
            body: JSON.stringify(body),
        }),

    put: <T>(url: string, body?: unknown, options?: RequestInit) =>
        baseFetch<T>(url, {
            ...options,
            method: "PUT",
            body: JSON.stringify(body),
        }),

    delete: <T>(url: string, options?: RequestInit) =>
        baseFetch<T>(url, { ...options, method: "DELETE" }),
};
