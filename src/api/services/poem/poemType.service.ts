import { apiClient } from "@/api/core/apiClient";
import { ApiResponse } from "@/shared/types/response.type";
import {
    CreatePoemTypeDTO,
    UpdatePoemTypeDTO,
    PoemTypeResponse,
} from "@/shared/types/poemType.type";

/**
 * Service for poem types API
 * Frontend access point for CRUD operations on poem types.
 *
 * Base route: /api/protected/poemType
 */
export const poemTypeService = {
    /** Get all poem types */
    getAll: () =>
        apiClient.get<ApiResponse<PoemTypeResponse[]>>("/protected/poemType"),

    /** Get one poem type by ID */
    getById: (poemTypeId: string) =>
        apiClient.get<ApiResponse<PoemTypeResponse>>(
            `/protected/poemType/${poemTypeId}`
        ),

    /** Create new poem type */
    create: (data: CreatePoemTypeDTO) =>
        apiClient.post<ApiResponse<PoemTypeResponse>>(
            "/protected/poemType",
            data
        ),

    /** Update existing poem type by */
    update: (poemTypeId: string, data: UpdatePoemTypeDTO) =>
        apiClient.put<ApiResponse<PoemTypeResponse>>(
            `/protected/poemType/${poemTypeId}`,
            data
        ),

    /** Delete poem type by ID */
    delete: (poemTypeId: string) =>
        apiClient.delete<ApiResponse<null>>(`/protected/poemType/${poemTypeId}`),
};
