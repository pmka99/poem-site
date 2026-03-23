import { apiClient } from "@/api/core/apiClient";
import { ApiResponse } from "@/shared/types/response.type";
import {
    CreatePoemDTO,
    UpdatePoemDTO,
    PoemResponse,
} from "@/shared/types/poem.type";

/**
 * API layer for poem.
 * Provides direct HTTP access to poem endpoints.
 *
 * Base URL: /api/protected/poem
 */
export const poemApi = {
    /** Get all poems */
    getAll: () =>
        apiClient.get<ApiResponse<PoemResponse[]>>("/protected/poem"),

    /** Get a single poem by ID */
    getById: (poemId: string) =>
        apiClient.get<ApiResponse<PoemResponse>>(
            `/protected/poem/${poemId}`
        ),

    /** Create a new poem */
    create: (data: CreatePoemDTO) =>
        apiClient.post<ApiResponse<PoemResponse>>(
            "/protected/poem",
            data
        ),

    /** Update an existing poem by ID */
    update: (poemId: string, data: UpdatePoemDTO) =>
        apiClient.put<ApiResponse<PoemResponse>>(
            `/protected/poem/${poemId}`,
            data
        ),

    /** Delete a poem by ID */
    delete: (poemId: string) =>
        apiClient.delete<ApiResponse<null>>(`/protected/poem/${poemId}`),
};
