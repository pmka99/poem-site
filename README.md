# 📖 Poem Site - وب‌اپلیکیشن شعر و داستان

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/MongoDB-9.2-green?style=flat-square&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Material--UI-7.3-007FFF?style=flat-square&logo=mui" alt="MUI" />
  <img src="https://img.shields.io/badge/TanStack_Query-5.90-FF4154?style=flat-square&logo=reactquery" alt="React Query" />
  <img src="https://img.shields.io/badge/Zod-4.3-3E67B1?style=flat-square&logo=zod" alt="Zod" />
</p>

## 📌 معرفی پروژه

یک وب‌اپلیکیشن **حرفه‌ای** و **ماژولار** برای مدیریت و انتشار **شعر**، **داستان** و **ابیات** ادبیات فارسی. این پروژه با معماری **Feature-Based** و استفاده از **Next.js 16** (App Router) و **MongoDB** ساخته شده است.

### 🎯 اهداف پروژه
- ارائه یک پلتفرم تخصصی برای انتشار آثار ادبی
- تجربه کاربری روان با پشتیبانی از **اسکرول نامحدود (Infinite Scroll)** و **مجازی‌سازی (Virtualization)**
- سیستم **RBAC** کامل برای مدیریت دسترسی‌ها
- **قابلیت توسعه‌پذیری بالا** با معماری ماژولار

---

## ✨ ویژگی‌های کلیدی

### 🏠 بخش عمومی (`src/app/(public)`)
- **صفحه اصلی** - نمایش آخرین شعرها و داستان‌ها با قابلیت فیلتر
- **نمایش شعر** - مشاهده شعر با دو حالت:
  - 📄 **صفحه‌بندی معمولی**
  - ♾️ **اسکرول نامحدود (Infinite Scroll)**
- **تنظیمات خواننده** - تغییر فونت، اندازه متن، حالت شب/روز
- **حفظ تنظیمات** - ذخیره تنظیمات در localStorage

### 🔐 بخش احراز هویت (`src/app/auth`)
- ورود با **شماره تلفن** و رمز عبور
- ثبت‌نام کاربر جدید با اعتبارسنجی پیشرفته
- محافظت از مسیرها با **Guards** (AuthGuard, GuestGuard)

### 👨‍🎨 داشبورد مدیریتی (`src/app/dashboard`)
مدیریت کامل محتوا با **DataGrid** پیشرفته:

| ماژول | قابلیت‌ها |
|-------|-----------|
| **شعرها** | لیست، افزودن، ویرایش، حذف، مدیریت ابیات |
| **ابیات** | افزودن/ویرایش مصراع‌ها، جابجایی ترتیب، تغییر وضعیت نمایش |
| **دسته‌بندی‌ها** | مدیریت دسته‌بندی‌های شعر |
| **نوع شعر** | مدیریت انواع شعر (غزل، قصیده، مثنوی، ...) |

### ⚡ قابلیت‌های فنی پیشرفته
- **مجازی‌سازی لیست** - رندر بهینه ابیات با React Virtual
- **اسکرول نامحدود** - بارگذاری خودکار هنگام اسکرول
- **کش کردن داده** - با TanStack Query
- **مدال‌های پویا** - سیستم مدیریت مدال پیشرفته
- **تأیید عملیات** - دیالوگ confirm قبل از عملیات حذف

---

## 🛠️ تکنولوژی‌ها و معماری

### فرانت‌اند
- **Next.js 16** - App Router، SSR، SSG
- **React 19** - Concurrent features
- **Material-UI 7.3** - کامپوننت‌های آماده با تم RTL
- **TailwindCSS 4** - استایلینگ سریع
- **TanStack React Query** - مدیریت وضعیت سمت سرور
- **React Hook Form + Zod** - فرم‌ها و اعتبارسنجی
- **React Virtual** - رندر بهینه لیست‌های طولانی

### بک‌اند (API Routes)
- **MongoDB + Mongoose 9.2** - ODM با پشتیبانی از pagination
- **bcrypt** - هش کردن رمز عبور
- **JWT** - احراز هویت stateless

### ابزارها و لایه‌ها
- **TypeScript** - نوع‌گذاری قوی در کل پروژه
- **Zod** - اعتبارسنجی داده‌ها در کلاینت و سرور
- **ESLint** - linting کد

---

## 📁 ساختار پروژه (معماری Feature-Based)
```text
src/
├── 📂 app/ # لایه روتینگ Next.js
│ ├── 📂 (public)/ # صفحات عمومی (بدون نیاز به لاگین)
│ │ ├── 📂 poem/[poemId]/ # صفحه جزئیات شعر
│ │ ├── layout.tsx # لایه عمومی با سایدبار
│ │ └── page.tsx # صفحه اصلی
│ ├── 📂 api/ # API Routes
│ │ ├── 📂 auth/ # احراز هویت
│ │ ├── 📂 poem/ # مدیریت شعر
│ │ │ ├── [poemId]/hemistichs/ # مدیریت ابیات
│ │ │ │ ├── range/ # عملیات گروهی
│ │ │ │ │ ├── movement/ # جابجایی ترتیب
│ │ │ │ │ └── visibility/ # تغییر وضعیت نمایش
│ │ │ │ └── [hemistichId]/ # عملیات روی بیت خاص
│ │ │ └── route.ts
│ │ ├── 📂 category/ # دسته‌بندی‌ها
│ │ ├── 📂 poemType/ # انواع شعر
│ │ └── 📂 read-text/ # متن خوان (text-to-speech)
│ ├── 📂 auth/ # صفحات احراز هویت
│ │ ├── 📂 sign-in/ # ورود
│ │ ├── 📂 sign-up/ # ثبت‌نام
│ │ └── layout.tsx
│ └── 📂 dashboard/ # داشبورد مدیریتی
│ ├── 📂 poems/ # مدیریت شعرها
│ │ └── [poemId]/hemistich/ # مدیریت ابیات شعر
│ ├── 📂 categories/ # مدیریت دسته‌بندی‌ها
│ └── 📂 poemTypes/ # مدیریت انواع شعر
│
├── 📂 api/ # لایه ارتباط با سرور (API Client)
│ ├── 📂 core/ # هسته API
│ │ ├── apiClient.ts # کلاینت اصلی axios-like
│ │ ├── apiError.ts # مدیریت خطاها
│ │ └── baseFetch.ts # fetch wrapper
│ └── 📂 queryClient/ # تنظیمات React Query
│
├── 📂 components/ # کامپوننت‌های عمومی
│ ├── 📂 datagrid/ # دیتاگرید پیشرفته
│ │ ├── appDataGrid.tsx # کامپوننت اصلی
│ │ ├── useDataGrid.ts # هوک مدیریت state
│ │ ├── 📂 toolbar/ # نوار ابزار
│ │ └── 📂 columns/ # تعریف ستون‌ها
│ ├── 📂 form/ # فرم‌های آماده (RHF)
│ │ ├── rhfTextField.tsx
│ │ ├── rhfSelect.tsx
│ │ └── formProvider.tsx
│ ├── 📂 filters/ # کامپوننت‌های فیلتر
│ │ ├── select.tsx
│ │ └── multiSelect.tsx
│ ├── 📂 modals/ # سیستم مدال
│ └── 📂 drawer/ # دراور سمت راست
│
├── 📂 features/ | لایه ویژگی‌ها (Feature-Based)
│ ├── 📂 auth/ | ویژگی احراز هویت
│ │ ├── 📂 api/ # API calls
│ │ ├── 📂 hooks/ # هوک‌های اختصاصی
│ │ ├── 📂 services/ # سرویس‌ها
│ │ └── 📂 views/ # کامپوننت‌های صفحه
│ │ ├── signIn/
│ │ └── signUp/
│ ├── 📂 poem/ | ویژگی شعر
│ │ ├── 📂 public/ # بخش عمومی
│ │ │ ├── 📂 components/ # کامپوننت‌های نمایش شعر
│ │ │ │ ├── hemistichList.tsx
│ │ │ │ ├── hemistichVirtualList.tsx
│ │ │ │ └── 📂 verseLayout/ # طرح‌بندی‌های مختلف ابیات
│ │ │ ├── 📂 views/ # صفحات
│ │ │ │ ├── 📂 poem/ # صفحه جزئیات شعر
│ │ │ │ │ ├── paginitaion/ # حالت صفحه‌بندی
│ │ │ │ │ └── infinitScroll/ # حالت اسکرول نامحدود
│ │ │ │ └── 📂 poemsList/ # لیست شعرها
│ │ │ ├── 📂 hooks/ # هوک‌های اختصاصی
│ │ │ └── 📂 services/ # سرویس‌ها
│ │ └── 📂 protected/ # بخش محافظت شده (داشبورد)
│ │ ├── 📂 components/ # کامپوننت‌های مدیریت
│ │ ├── 📂 context/ # Context API برای ابیات
│ │ ├── 📂 provider/ # Providerها
│ │ └── 📂 views/ # صفحات مدیریت
│ │ ├── 📂 poem/ # مدیریت شعرها (جدول)
│ │ └── 📂 hemistich/ # مدیریت ابیات
│ ├── 📂 category/ | ویژگی دسته‌بندی
│ │ ├── 📂 public/ # عمومی
│ │ └── 📂 protected/ # مدیریت (CRUD)
│ └── 📂 poemType/ | ویژگی نوع شعر
│ ├── 📂 public/
│ └── 📂 protected/
│
├── 📂 server/ # لایه سرور (backend logic)
│ ├── 📂 models/ # مدل‌های Mongoose
│ │ ├── user.ts
│ │ ├── role.ts
│ │ ├── poem.ts
│ │ ├── hemistich.ts
│ │ ├── category.ts
│ │ ├── poemType.ts
│ │ └── comment.ts
│ ├── 📂 guard/ # سیستم احراز هویت و مجوزها
│ │ ├── 📂 access/ # بررسی دسترسی (RBAC)
│ │ │ ├── 📂 policies/ # سیاست‌های دسترسی هر Resource
│ │ │ │ ├── poem.policy.ts
│ │ │ │ ├── comment.policy.ts
│ │ │ │ └── ...
│ │ │ ├── access.service.ts # سرویس اصلی بررسی دسترسی
│ │ │ └── policyRegistry.ts # ثبت سیاست‌ها
│ │ ├── 📂 protectedRoute/ # میدلور محافظت از مسیر
│ │ └── 📂 publicRoute/ # مسیرهای عمومی
│ ├── 📂 validators/ # اعتبارسنجی درخواست‌ها
│ │ ├── validateBody.ts
│ │ ├── validateParams.ts
│ │ └── withValidation.ts # HOF برای اعتبارسنجی
│ ├── 📂 mapper/ # تبدیل دیتا بین لایه‌ها
│ ├── 📂 messages/ # پیام‌های خطا و موفقیت
│ └── 📂 utils/ # توابع کمکی
│ ├── db.ts # اتصال به دیتابیس
│ ├── authUtils.ts # توابع احراز هویت
│ └── rebalancerHemistichOrder.ts # بازسازی ترتیب ابیات
│
├── 📂 shared/ | لایه مشترک بین کلاینت و سرور
│ ├── 📂 schemas/ # اسکیمای اعتبارسنجی (Zod)
│ │ ├── auth.schema.ts
│ │ ├── poem.schema.ts
│ │ ├── hemistich.schema.ts
│ │ └── ...
│ └── 📂 types/ # تعاریف TypeScript مشترک
│ ├── auth.type.ts
│ ├── poem.type.ts
│ └── ...
│
├── 📂 contexts/ | Contextهای React
│ ├── modalContext.ts # مدیریت مدال‌ها
│ ├── confirmContext.ts # مدیریت دیالوگ تأیید
│ └── readerSettingContext.ts # تنظیمات خواننده
│
├── 📂 hooks/ | هوک‌های عمومی
│ ├── useModals.ts
│ ├── useConfirm.ts
│ └── useReaderSetting.ts
│
├── 📂 guard/ | Guards سمت کلاینت
│ ├── authGuard.tsx # محافظت از مسیرهای نیازمند لاگین
│ └── guestGuard.tsx # جلوگیری از دسترسی لاگین‌شده به صفحات لاگین
│
├── 📂 layout/ | لایه‌های layout
│ ├── 📂 public/ # لایه عمومی
│ │ ├── header/
│ │ ├── sidebar/ # سایدبار با محتوای داینامیک
│ │ │ └── 📂 content/ # محتوای سایدبار (user, navbar, settings)
│ │ └── footer/
│ └── 📂 dashboard/ # لایه داشبورد
│ ├── sidebar/
│ └── content/
│
├── 📂 providers/ | Providerهای سطح بالا
│ ├── reactQueryProvider.tsx
│ ├── modalProvider.tsx
│ ├── confirmProvider.tsx
│ └── readerSettingProvider.tsx
│
├── 📂 routes/ | مسیرهای ثابت برنامه
├── 📂 theme/ | تم و استایل MUI (RTL)
├── 📂 types/ | تعاریف TypeScript اضافی
└── 📂 enum/ | Enumهای سراسری
├── role.ts | نقش‌های کاربری
├── permission.ts | مجوزها
└── poem.ts | وضعیت‌های شعر
```
---



## 📋 پیش‌نیازها

قبل از نصب، مطمئن شوید موارد زیر را دارید:

- **Node.js** نسخه 20 یا بالاتر
- **MongoDB** نصب شده (محلی) یا حساب MongoDB Atlas (ابر)
- **npm** یا **yarn** یا **pnpm**
- **Git** (برای کلون کردن پروژه)

---

## 🚀 نصب و راه‌اندازی گام به گام

### 1️⃣ کلون کردن مخزن

```bash
git clone https://github.com/your-username/poem-site.git
cd poem-site
```

### 2️⃣ نصب وابستگی‌ها

```bash
npm install
# یا
yarn install
# یا
pnpm install
```

### 3️⃣ تنظیم متغیرهای محیطی
فایل .env را در روت پروژه ایجاد کرده و مقادیر زیر را تنظیم کنید:

```.env
# ==========================================
# تنظیمات دیتابیس
# ==========================================
MONGODB_URI=mongodb://127.0.0.1:27017/poem-site
# برای MongoDB Atlas از آدرس زیر استفاده کنید:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/poem-site

# ==========================================
# اطلاعات کاربر ادمین پیش‌فرض
# ==========================================
ADMIN_USERNAME=
ADMIN_PASSWORD=
ADMIN_PHONE_NUMBER=

# ==========================================
# تنظیمات امنیتی
# ==========================================
SALT_ROUNDS=14

# ==========================================
# تنظیمات JWT
# ==========================================
PRIVET_KEY=
ALGORITHM=HS256
EXPIRESIN_HOURS=24

# ==========================================
# آدرس API (برای درخواست‌های کلاینت)
# ==========================================
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 4️⃣ اجرای سیدرها (Seeders)
برای ایجاد نقش‌های سیستمی و کاربر ادمین در دیتابیس:

```bash
npm run seed
```
این دستور به ترتیب زیر اجرا می‌شود:
اتصال به دیتابیس MongoDB
ایجاد نقش‌های سیستمی (USER, AUTHOR, ADMIN)
ایجاد کاربر ادمین با اطلاعات فایل .env

خروجی موفقیت‌آمیز:

```text
✅ Roles seeded successfully
✅ Admin user seeded successfully
```

### 5️⃣ اجرای پروژه در حالت توسعه

```bash
npm run dev
```

سایت در آدرس http://localhost:3000 در دسترس خواهد بود.

### 6️⃣ ساخت نسخه تولید (Production)

```bash
npm run build    # ساخت پروژه
npm start        # اجرای پروژه در حالت production
```



##🔌 API Endpoints مهم
### احراز هویت
POST	    /api/auth/signIn	ورود کاربر
POST	    /api/auth/signUp	ثبت‌نام
GET	        /api/auth/userInfo	اطلاعات کاربر جاری
### شعر و ابیات
GET	        /api/poem   	    دریافت لیست شعرها (با صفحه‌بندی)
GET	        /api/poem/[poemId]	دریافت جزئیات شعر با ابیات
POST	    /api/poem       	ایجاد شعر جدید (شاعر، ادمین)
PUT	        /api/poem/[poemId]	ویرایش شعر
DELETE	    /api/poem/[poemId]	حذف شعر
### مدیریت ابیات (پیشرفته)
POST	    /api/poem/[poemId]/hemistichs               	افزودن بیت جدید
PUT	        /api/poem/[poemId]/hemistichs/[hemistichId] 	ویرایش بیت
DELETE	    /api/poem/[poemId]/hemistichs/[hemistichId] 	حذف بیت
PUT	        /api/poem/[poemId]/hemistichs/range/movement	جابجایی ترتیب ابیات
PUT	        /api/poem/[poemId]/hemistichs/range/visibility	تغییر وضعیت نمایش گروهی


## 🧪 راهنمای توسعه
افزودن Feature جدید
1. ایجاد پوشه Feature:
```bash
mkdir src/features/my-feature
mkdir src/features/my-feature/public
mkdir src/features/my-feature/protected
```
2.ساختار هر Feature:

```text
my-feature/
├── public/           # بخش عمومی (بدون لاگین)
│   ├── api/          # API calls
│   ├── hooks/        # هوک‌ها
│   ├── services/     # سرویس‌ها
│   └── views/        # کامپوننت‌های UI
└── protected/        # بخش محافظت شده (نیاز به لاگین و مجوز)
    ├── api/
    ├── hooks/
    ├── services/
    └── views/
```
3.افزودن مدل در سرور:

```typescript
// src/server/models/myModel.ts
import mongoose from 'mongoose';

const MyModelSchema = new mongoose.Schema({
  // فیلدها
});

export default mongoose.models.MyModel || mongoose.model('MyModel', MyModelSchema);
```

4.افزودن Policy دسترسی:
```typescript
// src/server/guard/access/policies/myModel.policy.ts
import { IPolicy } from './IPolicy';

export class MyModelPolicy implements IPolicy {
  canCreate(user: any, data: any) { ... }
  canUpdate(user: any, id: string) { ... }
  canDelete(user: any, id: string) { ... }
}
```

5.ثبت Policy در PolicyRegistry

6.ایجاد API Routes:
```typescript
// src/app/api/my-feature/route.ts
import { withValidation } from '@/src/server/validators/withValidation';
import { protectedRoute } from '@/src/server/guard/protectedRoute';

export const POST = protectedRoute(
  withValidation({ body: mySchema }, async (req, validated) => {
    // منطق API
  })
);
```

## 📊 دیتابیس مدل‌ها (Mongoose Models)
مدل	توضیحات	ارتباطات
User    	کاربران سیستم	
Role	    نقش‌ها و مجوزها	
Poem	    شعرها  	
Hemistich	ابیات	
Category	دسته‌بندی	
PoemType	 نوع شعر (غزل، قصیده، ...)	
Comment	    کامنت‌ها 	

## 🤝 مشارکت در توسعه
1.Fork مخزن

2.Branch جدید ایجاد کنید:
```bash
git checkout -b feature/amazing-feature
```
3.Commit کنید (از قرارداد Conventional Commits استفاده کنید):

```bash
git commit -m 'feat: add amazing feature'
```

4.Push کنید:
```bash
git push origin feature/amazing-feature
```
5.Pull Request باز کنید

