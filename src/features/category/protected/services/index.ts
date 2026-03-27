import { categoryApi } from "@/features/category/protected/api";
import {
    CreateCategoryDTO,
    UpdateCategoryDTO,
    CategoryResponse,
} from "@/shared/types/category.type";
import { ApiResponse } from "@/shared/types/response.type";

export const categoryService = {
    async getAll(): Promise<ApiResponse<CategoryResponse[]>> {
        const res = await categoryApi.getAll();
        return res;
    },

    async getById(id: string): Promise<ApiResponse<CategoryResponse>> {
        const res = await categoryApi.getById(id);
        return res;
    },

    async create(data: CreateCategoryDTO): Promise<ApiResponse<CategoryResponse>> {
        const res = await categoryApi.create(data);
        return res;
    },

    async update(id: string, data: UpdateCategoryDTO): Promise<ApiResponse<CategoryResponse>> {
        const res = await categoryApi.update(id, data);
        return res;
    },

    async delete(id: string): Promise<ApiResponse<any>> {
        const res = await categoryApi.delete(id);
        return res;
    },
};
