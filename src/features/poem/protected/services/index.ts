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

    create: (data: CreatePoemDTO): Promise<ApiResponse<PoemResponse>> =>
        poemApi.create(data),

    update: (poemId: string, data: UpdatePoemDTO): Promise<ApiResponse<PoemResponse>> =>
        poemApi.update(poemId, data),

    delete: (poemId: string): Promise<ApiResponse<PoemResponse>> =>
        poemApi.delete(poemId),

    // ------------------------ Hemistich ------------------------
    getAllHemistichs: (poemId: string, params?: Record<string, any>): Promise<ApiResponse<HemistichResponse[]>> =>
        poemApi.getAllHemistichs(poemId, params),

    getHemistichById: (poemId: string, hemistichId: string): Promise<ApiResponse<HemistichResponse>> =>
        poemApi.getByHemistichId(poemId, hemistichId),

    createHemistich: (poemId: string, data: CreateHemistichDTO): Promise<ApiResponse<HemistichResponse>> =>
        poemApi.createHemistich(poemId, data),

    updateHemistich: (poemId: string, hemistichId: string, data: UpdateHemistichDTO): Promise<ApiResponse<HemistichResponse>> =>
        poemApi.updateHemistich(poemId, hemistichId, data),

    deleteHemistich: (poemId: string, hemistichId: string): Promise<ApiResponse<HemistichResponse>> =>
        poemApi.deleteHemistich(poemId, hemistichId),

    // ------------------------ Hemistich Range ------------------------

    moveHemistichRange: (
        poemId: string,
        data: MoveRangeHemistichDTO
    ) =>
        poemApi.moveHemistichRange(poemId, data),

    updateHemistichVisibilityRange: (
        poemId: string,
        data: VisibiltyRangeHemistichDTO
    ) =>
        poemApi.updateHemistichVisibilityRange(poemId, data),

    deleteHemistichRange: (
        poemId: string,
        data: DeleteRangeHemistichDTO
    ) =>
        poemApi.deleteHemistichRange(poemId, data),

};
