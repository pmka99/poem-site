import { baseFetch } from "./baseFetch";

const toQueryString = (params: Record<string, any>) => {
    return Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
};

export const apiClient = {

    get: <T>(url: string, params?: Record<string, any>, options?: RequestInit) => {
        const queryString = params ? `?${toQueryString(params)}` : '';
        return baseFetch<T>(`${url}${queryString}`, { ...options, method: "GET" });
    },
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
