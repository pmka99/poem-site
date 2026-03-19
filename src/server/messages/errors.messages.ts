export const ERRORSMESSAGES = {
    // عمومی
    INTERNAL_SERVER_ERROR: "خطای داخلی سرور",
    BAD_REQUEST: "درخواست نامعتبر است",
    VALIDATION_ERROR: "خطا در اعتبارسنجی اطلاعات",

    // احراز هویت
    UNAUTHORIZED: "دسترسی غیرمجاز",
    INVALID_TOKEN: "توکن نامعتبر است",
    TOKEN_EXPIRED: "توکن منقضی شده است",
    LOGIN_FAILED: "ایمیل یا رمز عبور اشتباه است",
    REGISTER_FAILED: "ثبت نام با خطا مواجه شد",

    // دسترسی
    FORBIDDEN: "شما اجازه انجام این عملیات را ندارید",

    // کاربر
    USER_NOT_FOUND: "کاربر یافت نشد",
    USER_ALREADY_EXISTS: "کاربری با این اطلاعات قبلاً ثبت شده است",
    INVALID_USER_ID: "شناسه کاربر نامعتبر است",

    // نقش
    ROLE_NOT_FOUND: "نقش مورد نظر یافت نشد",
    ROLE_ALREADY_EXISTS: "این نقش قبلاً ایجاد شده است",

    // شعر
    POEM_NOT_FOUND: "شعر مورد نظر یافت نشد",
    POEM_CREATE_FAILED: "ایجاد شعر با خطا مواجه شد",
    POEM_UPDATE_FAILED: "به‌روزرسانی شعر با خطا مواجه شد",
    POEM_DELETE_FAILED: "حذف شعر با خطا مواجه شد",

    // نوع شعر
    POEM_TYPE_NOT_FOUND: "نوع شعر یافت نشد",
    POEM_TYPE_ALREADY_EXISTS: "این نوع شعر قبلاً ثبت شده است",

    // نظر
    COMMENT_NOT_FOUND: "نظر مورد نظر یافت نشد",
    COMMENT_CREATE_FAILED: "ثبت نظر با خطا مواجه شد",
    COMMENT_DELETE_FAILED: "حذف نظر با خطا مواجه شد",

    // داستان
    STORY_NOT_FOUND: "داستان مورد نظر یافت نشد",
    STORY_CREATE_FAILED: "ایجاد داستان با خطا مواجه شد",
    STORY_UPDATE_FAILED: "به‌روزرسانی داستان با خطا مواجه شد",
    STORY_DELETE_FAILED: "حذف داستان با خطا مواجه شد",

    // پایگاه داده
    DATABASE_CONNECTION_FAILED: "اتصال به پایگاه داده برقرار نشد",
    DATABASE_QUERY_FAILED: "خطا در اجرای درخواست پایگاه داده",

    // پارامترها
    INVALID_PARAMS: "پارامترهای درخواست نامعتبر هستند",
    INVALID_QUERY: "پارامترهای جستجو نامعتبر هستند",

    // صفحه‌بندی
    INVALID_PAGE: "شماره صفحه نامعتبر است",
    INVALID_LIMIT: "مقدار limit نامعتبر است",
} as const;
