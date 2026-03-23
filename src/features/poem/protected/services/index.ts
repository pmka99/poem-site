import { poemApi } from "@/features/poem/protected/api";
import {
    CreatePoemDTO,
    UpdatePoemDTO,
    PoemResponse,
} from "@/shared/types/poem.type";
import { ApiResponse } from "@/shared/types/response.type";

export const poemService = {
    async getAll(): Promise<ApiResponse<PoemResponse[]>> {
        const res = await poemApi.getAll();
        return res;
    },

    async getById(id: string): Promise<ApiResponse<PoemResponse>> {
        const res = await poemApi.getById(id);
        return res;
    },

    async create(data: CreatePoemDTO): Promise<ApiResponse<PoemResponse>> {
        const res = await poemApi.create(data);
        return res;
    },

    async update(id: string, data: UpdatePoemDTO): Promise<ApiResponse<PoemResponse>> {
        const res = await poemApi.update(id, data);
        return res;
    },

    async delete(id: string): Promise<ApiResponse<any>> {
        const res = await poemApi.delete(id);
        return res;
    },
};
