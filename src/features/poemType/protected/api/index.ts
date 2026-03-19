import { apiClient } from "@/api/core/apiClient";
import { ApiResponse } from "@/shared/types/response.type";
import {
    CreatePoemTypeDTO,
    UpdatePoemTypeDTO,
    PoemTypeResponse,
} from "@/shared/types/poemType.type";

/**
 * API layer for poem types.
 * Provides direct HTTP access to poem type endpoints.
 *
 * Base URL: /api/protected/poemType
 */
export const poemTypeApi = {
    /** Get all poem types */
    getAll: () =>
        apiClient.get<ApiResponse<PoemTypeResponse[]>>("/protected/poemType"),

    /** Get a single poem type by ID */
    getById: (poemTypeId: string) =>
        apiClient.get<ApiResponse<PoemTypeResponse>>(
            `/protected/poemType/${poemTypeId}`
        ),

    /** Create a new poem type */
    create: (data: CreatePoemTypeDTO) =>
        apiClient.post<ApiResponse<PoemTypeResponse>>(
            "/protected/poemType",
            data
        ),

    /** Update an existing poem type by ID */
    update: (poemTypeId: string, data: UpdatePoemTypeDTO) =>
        apiClient.put<ApiResponse<PoemTypeResponse>>(
            `/protected/poemType/${poemTypeId}`,
            data
        ),

    /** Delete a poem type by ID */
    delete: (poemTypeId: string) =>
        apiClient.delete<ApiResponse<null>>(`/protected/poemType/${poemTypeId}`),
};
