import { categoryApi } from "@/features/category/public/api";
import {
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
    }
};
