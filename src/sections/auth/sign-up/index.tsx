"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const schema = z.object({
    phoneNumber: z.string().min(1, "تلفن همراه الزامی است").regex(/^09\d{9}$/, "فرمت شماره تلفن همراه صحیح نیست"),
    password: z.string().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"),
    confirmPassword: z.string().min(6, "تکرار رمز عبور باید حداقل 6 کاراکتر باشد"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "رمزهای عبور مطابقت ندارند",
    path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof schema>;

export default async function SignUpView() {

    // const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    //     values:{
    //         username: string;
    //         phoneNumber: string;
    //         password: string;
    //         role: Types.ObjectId;
    //     },
    //     resolver: zodResolver(schema),
    // });

    return (
        <>
        </>
    )
}


