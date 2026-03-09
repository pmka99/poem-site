import { NextResponse } from "next/server";
import { ApiResponse } from "@/shared/types/response.type";

export const successResponse = <T>({
    data,
    message,
    meta,
    status = 200,
}: {
    data?: T;
    message?: string;
    meta?: ApiResponse["meta"];
    status?: number;
}) => {
    const response: ApiResponse<T> = {
        success: true,
        message,
        data,
        meta,
    };

    return NextResponse.json(response, { status });
};

export const errorResponse = ({
    message,
    status = 400,
    errors,
}: {
    message: string;
    status?: number;
    errors?: ApiResponse["errors"];
}) => {
    const response: ApiResponse = {
        success: false,
        message,
        errors,
    };

    return NextResponse.json(response, { status });
};
