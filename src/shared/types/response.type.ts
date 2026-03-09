export interface ApiResponse<T = null> {
    success: boolean
    message?: string
    data?: T
    errors?: any
    meta?: {
        page?: number
        limit?: number
        total?: number
    }
}