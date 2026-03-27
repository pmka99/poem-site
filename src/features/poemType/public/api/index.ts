import { apiClient } from "@/api/core/apiClient";
import { ApiResponse } from "@/shared/types/response.type";
import {
    PoemTypeResponse,
} from "@/shared/types/poemType.type";

/**
 * API layer for poem types.
 * Provides direct HTTP access to poem type endpoints.
 *
 * Base URL: /api/poemType
 */
export const poemTypeApi = {
    /** Get all poem types */
    getAll: () =>
        apiClient.get<ApiResponse<PoemTypeResponse[]>>("/poemType"),

    /** Get a single poem type by ID */
    getById: (poemTypeId: string) =>
        apiClient.get<ApiResponse<PoemTypeResponse>>(
            `/poemType/${poemTypeId}`
        ),
};
