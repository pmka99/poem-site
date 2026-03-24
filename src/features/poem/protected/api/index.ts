import { apiClient } from "@/api/core/apiClient";
import { PoemResponse, CreatePoemDTO, UpdatePoemDTO } from "@/shared/types/poem.type";
import { HemistichResponse, CreateHemistichDTO, UpdateHemistichDTO } from "@/shared/types/hemistich.type";
import { ApiResponse } from "@/shared/types/response.type";

export const poemApi = {
    // ------------------------ Poem ------------------------
    getAll: (params?: Record<string, any>) =>
        apiClient.get<ApiResponse<PoemResponse[]>>("/protected/poem", params),

    getById: (poemId: string) =>
        apiClient.get<ApiResponse<PoemResponse>>(`/protected/poem/${poemId}`),

    create: (data: CreatePoemDTO) =>
        apiClient.post<ApiResponse<PoemResponse>>("/protected/poem", data),

    update: (poemId: string, data: UpdatePoemDTO) =>
        apiClient.put<ApiResponse<PoemResponse>>(`/protected/poem/${poemId}`, data),

    delete: (poemId: string) =>
        apiClient.delete<ApiResponse<PoemResponse>>(`/protected/poem/${poemId}`),

    // ------------------------ Hemistich ------------------------
    getAllHemistichs: (poemId: string, params?: Record<string, any>) =>
        apiClient.get<ApiResponse<HemistichResponse[]>>(`/protected/poem/${poemId}/hemistichs`, params),

    getByHemistichId: (poemId: string, hemistichId: string) =>
        apiClient.get<ApiResponse<HemistichResponse>>(`/protected/poem/${poemId}/hemistichs/${hemistichId}`),

    createHemistich: (poemId: string, data: CreateHemistichDTO) =>
        apiClient.post<ApiResponse<HemistichResponse>>(`/protected/poem/${poemId}/hemistichs`, data),

    updateHemistich: (poemId: string, hemistichId: string, data: UpdateHemistichDTO) =>
        apiClient.put<ApiResponse<HemistichResponse>>(`/protected/poem/${poemId}/hemistichs/${hemistichId}`, data),

    deleteHemistich: (poemId: string, hemistichId: string) =>
        apiClient.delete<ApiResponse<HemistichResponse>>(`/protected/poem/${poemId}/hemistichs/${hemistichId}`),
};
