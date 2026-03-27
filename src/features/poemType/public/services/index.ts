import { poemTypeApi } from "@/features/poemType/public/api";
import {
    PoemTypeResponse,
} from "@/shared/types/poemType.type";
import { ApiResponse } from "@/shared/types/response.type";

export const poemTypeService = {
    async getAll(): Promise<ApiResponse<PoemTypeResponse[]>> {
        const res = await poemTypeApi.getAll();
        return res;
    },

    async getById(id: string): Promise<ApiResponse<PoemTypeResponse>> {
        const res = await poemTypeApi.getById(id);
        return res;
    },
};
