"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/form/formProvider";
import { Field } from "@/components/form";
import { Button } from "@mui/material";
import { authService } from "@/api/services/auth/auth.service";

const schema = z.object({
    username: z.string().min(1, "نام کاربری الزامی است"),
    phoneNumber: z.string().min(1, "تلفن همراه الزامی است").regex(/^09\d{9}$/, "فرمت شماره تلفن همراه صحیح نیست"),
    password: z.string().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "رمزهای عبور مطابقت ندارند",
    path: ["confirmPassword"],
});

export type SingUpFormData = z.infer<typeof schema>;

export default function SignUpView() {

    const methods = useForm<SingUpFormData>({
        values: {
            username: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
        },
        resolver: zodResolver(schema),
        mode: "all"
    });

    const { control, handleSubmit, watch, setValue } = methods;

    const onSubmit = async (data: SingUpFormData) => {
        await authService.signUp({
            username: data.username,
            password: data?.password,
            phoneNumber: data.phoneNumber,

        })
    }

    return (
        <div className="items-center flex h-full w-full bg-background p-4 rounded">
            <Form onSubmit={handleSubmit(onSubmit)} methods={methods} >
                <div className="flex flex-col gap-2 p-2 items-center">
                    <h2>ثبت نام</h2>
                    <Field.Text name="username" label="نام کاربری" />
                    <Field.Text name="phoneNumber" label="تلفن همراه" />
                    <Field.Text name="password" type="password" label="رمز عبور" />
                    <Field.Text name="confirmPassword" type="password" label="تکرار رمز عبور" />
                    <Button className="text-white!" type="submit" variant="contained" color="success" fullWidth>
                        ثبت نام
                    </Button>
                </div>
            </Form>
        </div>
    )
}


