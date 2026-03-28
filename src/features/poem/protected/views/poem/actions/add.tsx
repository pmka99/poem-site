"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";

import { Form } from "@/components/form/formProvider";
import { Field } from "@/components/form";
import CustomModal from "@/components/modals/customModal";

import { useModal } from "@/hooks";
import { MODALS } from "@/types/modals";

import { createPoemSchema } from "@/shared/schemas/poem.schema";
import { CreatePoemDTO } from "@/shared/types/poem.type";

import { useCreatePoem } from "@/features/poem/protected/hooks";
import { useAuth } from "@/features/auth/hooks";
import { usePoemTypes } from "@/features/poemType/protected/hooks";
import { useEffect, useState } from "react";
import StoryBox from "@/features/poem/protected/components/story";
import { useCategorys } from "@/features/category/protected/hooks";


export default function DashboardPoemAddModal() {
    const { modals, closeModal } = useModal();

    const { mutate: createPoem, isPending } =
        useCreatePoem();

    const { data: user } = useAuth();

    const [story, setStory] = useState<string[]>([])

    const methods = useForm<CreatePoemDTO>({
        defaultValues: {
            title: "",
            author: "",
            poemType: "",
            category: "",
            show: true,
            story: [],
            order: 1000000
        },
        resolver: zodResolver(createPoemSchema),
        mode: "all",
    });

    useEffect(() => {
        if (!user?.data?._id) return
        methods.setValue("author", user?.data?._id)
    }, [user])


    const onSubmit: SubmitHandler<CreatePoemDTO> = (data) => {

        createPoem({
            ...data,
            story
        }, {
            onSuccess: () => {
                closeModal(MODALS.ADD_POEM);
                methods.reset();
            },
        });
    };

    const { data: poemTypes, isLoading: poemTypes_isloading } = usePoemTypes();

    const poemTypesItems = poemTypes?.data?.map(item => ({ id: item._id, label: item.name })
    ) ?? []

    const { data: categories, isLoading: categories_isLoading } = useCategorys();

    const categoriesItems = categories?.data?.map(item => ({ id: item._id, label: item.title })
    ) ?? []


    return (
        <CustomModal
            title="افزودن"
            open={modals[MODALS.ADD_POEM]?.open ?? false}
            onClose={() => closeModal(MODALS.ADD_POEM)}
        >
            <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2 p-2 items-center">
                    <Field.Text
                        name="title"
                        label="نام"
                    />

                    <Field.Text
                        type="number"
                        name="order"
                        label="اولویت نمایش"
                    />

                    <Field.Select
                        name="poemType"
                        label="نوع شعر"
                        items={poemTypesItems}
                    />

                    <Field.Select
                        name="category"
                        label="موضوع شعر"
                        items={categoriesItems}
                    />

                    <StoryBox story={story} onChangeStory={(value) => setStory(value)} />

                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        fullWidth
                        disabled={isPending}
                        className="text-white!"
                    >
                        تایید
                    </Button>
                </div>
            </Form>
        </CustomModal>
    );
}
