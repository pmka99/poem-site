"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/form/formProvider";
import { Field } from "@/components/form";
import { Button } from "@mui/material";
import { authService } from "@/api/services/auth/auth.service";
import { useRouter } from "next/navigation";

const schema = z.object({
    identifier: z.string().min(1, "نام کاربری الزامی است"),
    password: z.string().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"),
})

export type SingInFormData = z.infer<typeof schema>;

export default function SingInView() {

    const router = useRouter();

    const methods = useForm<SingInFormData>({
        values: {
            identifier: "",
            password: "",
        },
        resolver: zodResolver(schema),
        mode: "all"
    });

    const { control, handleSubmit, watch, setValue } = methods;

    const onSubmit = async (data: SingInFormData) => {

        const response = await authService.signIn({
            identifier: data.identifier,
            password: data?.password,
        })

        if (response.success) {
            router.push("/dashboard")
        }
    }

    return (
        <div className="items-center flex h-full w-full bg-background p-4 rounded">
            <Form onSubmit={handleSubmit(onSubmit)} methods={methods} >
                <div className="flex flex-col gap-2 p-2 items-center">
                    <h2>ورود به حساب کاربری</h2>
                    <Field.Text name="identifier" label="نام کاربری یا تلفن همراه" />
                    <Field.Text name="password" type="password" label="رمز عبور" />
                    <Button className="text-white!" type="submit" variant="contained" color="success" fullWidth>
                        ورود
                    </Button>
                </div>
            </Form>
        </div>
    )
}


