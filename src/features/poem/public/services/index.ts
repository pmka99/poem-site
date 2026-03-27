import { poemApi } from "@features/poem/protected/api";
import { PoemResponse, CreatePoemDTO, UpdatePoemDTO } from "@/shared/types/poem.type";
import { HemistichResponse, CreateHemistichDTO, UpdateHemistichDTO, MoveRangeHemistichDTO, VisibiltyRangeHemistichDTO, DeleteRangeHemistichDTO } from "@/shared/types/hemistich.type";
import { ApiResponse } from "@/shared/types/response.type";
export const poemService = {
    // ------------------------ Poem ------------------------
    getAll: (params?: Record<string, any>): Promise<ApiResponse<PoemResponse[]>> =>
        poemApi.getAll(params),

    getById: (poemId: string): Promise<ApiResponse<PoemResponse>> =>
        poemApi.getById(poemId),

    // ------------------------ Hemistich ------------------------
    getAllHemistichs: (poemId: string, params?: Record<string, any>): Promise<ApiResponse<HemistichResponse[]>> =>
        poemApi.getAllHemistichs(poemId, params),

    getHemistichById: (poemId: string, hemistichId: string): Promise<ApiResponse<HemistichResponse>> =>
        poemApi.getByHemistichId(poemId, hemistichId),


};
