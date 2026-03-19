import { poemTypeApi } from "@/features/poemType/protected/api";
import {
    CreatePoemTypeDTO,
    UpdatePoemTypeDTO,
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

    async create(data: CreatePoemTypeDTO): Promise<ApiResponse<PoemTypeResponse>> {
        const res = await poemTypeApi.create(data);
        return res;
    },

    async update(id: string, data: UpdatePoemTypeDTO): Promise<ApiResponse<PoemTypeResponse>> {
        const res = await poemTypeApi.update(id, data);
        return res;
    },

    async delete(id: string): Promise<ApiResponse<any>> {
        const res = await poemTypeApi.delete(id);
        return res;
    },
};
