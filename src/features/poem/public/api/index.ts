import { apiClient } from "@/api/core/apiClient";
import { PoemResponse } from "@/shared/types/poem.type";
import { HemistichResponse} from "@/shared/types/hemistich.type";
import { ApiResponse } from "@/shared/types/response.type";

export const poemApi = {
    // ------------------------ Poem ------------------------
    getAll: (params?: Record<string, any>) =>
        apiClient.get<ApiResponse<PoemResponse[]>>("/poem", params),

    getById: (poemId: string) =>
        apiClient.get<ApiResponse<PoemResponse>>(`/poem/${poemId}`),

    

    // ------------------------ Hemistich ------------------------
    getAllHemistichs: (poemId: string, params?: Record<string, any>) =>
        apiClient.get<ApiResponse<HemistichResponse[]>>(`/poem/${poemId}/hemistichs`, params),

    getByHemistichId: (poemId: string, hemistichId: string) =>
        apiClient.get<ApiResponse<HemistichResponse>>(`/poem/${poemId}/hemistichs/${hemistichId}`),


};
