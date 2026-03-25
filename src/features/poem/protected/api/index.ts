import { apiClient } from "@/api/core/apiClient";
import { PoemResponse, CreatePoemDTO, UpdatePoemDTO } from "@/shared/types/poem.type";
import { HemistichResponse, CreateHemistichDTO, UpdateHemistichDTO, MoveRangeHemistichDTO, VisibiltyRangeHemistichDTO, DeleteRangeHemistichDTO } from "@/shared/types/hemistich.type";
import { ApiResponse } from "@/shared/types/response.type";

export const poemApi = {
    // ------------------------ Poem ------------------------
    getAll: (params?: Record<string, any>) =>
        apiClient.get<ApiResponse<PoemResponse[]>>("/poem", params),

    getById: (poemId: string) =>
        apiClient.get<ApiResponse<PoemResponse>>(`/poem/${poemId}`),

    create: (data: CreatePoemDTO) =>
        apiClient.post<ApiResponse<PoemResponse>>("/poem", data),

    update: (poemId: string, data: UpdatePoemDTO) =>
        apiClient.put<ApiResponse<PoemResponse>>(`/poem/${poemId}`, data),

    delete: (poemId: string) =>
        apiClient.delete<ApiResponse<PoemResponse>>(`/poem/${poemId}`),

    // ------------------------ Hemistich ------------------------
    getAllHemistichs: (poemId: string, params?: Record<string, any>) =>
        apiClient.get<ApiResponse<HemistichResponse[]>>(`/poem/${poemId}/hemistichs`, params),

    getByHemistichId: (poemId: string, hemistichId: string) =>
        apiClient.get<ApiResponse<HemistichResponse>>(`/poem/${poemId}/hemistichs/${hemistichId}`),

    createHemistich: (poemId: string, data: CreateHemistichDTO) =>
        apiClient.post<ApiResponse<HemistichResponse>>(`/poem/${poemId}/hemistichs`, data),

    updateHemistich: (poemId: string, hemistichId: string, data: UpdateHemistichDTO) =>
        apiClient.put<ApiResponse<HemistichResponse>>(`/poem/${poemId}/hemistichs/${hemistichId}`, data),

    deleteHemistich: (poemId: string, hemistichId: string) =>
        apiClient.delete<ApiResponse<HemistichResponse>>(`/poem/${poemId}/hemistichs/${hemistichId}`),
    
    // ------------------------ Hemistich Range ------------------------

    moveHemistichRange: (
        poemId: string,
        data: MoveRangeHemistichDTO
    ) =>
        apiClient.put<ApiResponse<void>>(
            `/poem/${poemId}/hemistichs/range/movement`,
            data
        ),

    updateHemistichVisibilityRange: (
        poemId: string,
        data: VisibiltyRangeHemistichDTO
    ) =>
        apiClient.put<ApiResponse<void>>(
            `/poem/${poemId}/hemistichs/range/visibility`,
            data
        ),

    deleteHemistichRange: (
        poemId: string,
        data: DeleteRangeHemistichDTO
    ) =>
        apiClient.delete<ApiResponse<void>>(
            `/poem/${poemId}/hemistichs/range`,
            {
                body: JSON.stringify(data),
            }
        ),


};
