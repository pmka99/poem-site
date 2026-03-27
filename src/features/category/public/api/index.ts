import { apiClient } from "@/api/core/apiClient";
import { ApiResponse } from "@/shared/types/response.type";
import {
    CategoryResponse,
} from "@/shared/types/category.type";

/**
 * API layer for categories.
 * Provides direct HTTP access to poem type endpoints.
 *
 * Base URL: /api/category
 */
export const categoryApi = {
    /** Get all categories */
    getAll: () =>
        apiClient.get<ApiResponse<CategoryResponse[]>>("/category"),

    /** Get a single poem type by ID */
    getById: (categoryId: string) =>
        apiClient.get<ApiResponse<CategoryResponse>>(
            `/category/${categoryId}`
        ),
};
