import { ApiError } from "./apiError";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function baseFetch<T>(
    url: string,
    options: RequestInit = {}
): Promise<T> {

    const res = await fetch(`${BASE_URL}${url}`, {
        credentials: "include", 
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        ...options,
    });

    let data;

    try {
        data = await res.json();
    } catch {
        data = null;
    }

    if (!res.ok) {

        if (res.status === 401 && typeof window !== "undefined") {
            window.location.href = "/login";
        }

        throw new ApiError(
            data?.message || "Request failed",
            res.status,
            data
        );
    }

    return data as T;
}
