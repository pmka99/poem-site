"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";

import { Form } from "@/components/form/formProvider";
import { Field } from "@/components/form";
import CustomModal from "@/components/modals/customModal";

import { useModal } from "@/hooks";
import { MODALS } from "@/types/modals";

import { updatePoemSchema } from "@/shared/schemas/poem.schema";
import { UpdatePoemDTO } from "@/shared/types/poem.type";


import { useEffect, useState } from "react";
import { usePoem, useUpdatePoem } from "@/features/poem/protected/hooks";
import { usePoemTypes } from "@/features/poemType/protected/hooks";
import StoryBox from "@/features/poem/protected/components/story";
import { useCategorys } from "@/features/category/protected/hooks";
import { UserResponse } from "@/shared/types/user.type";
import { PoemTypeResponse } from "@/shared/types/poemType.type";
import { CategoryResponse } from "@/shared/types/category.type";

export default function DashboardPoemEditModal() {
    const { modals, closeModal } = useModal();

    const poemId = modals[MODALS.EDIT_POEM]?.data?.poemId;

    const { mutate: updatePoem, isPending } =
        useUpdatePoem();

    const { data, isLoading } = usePoem(poemId ?? "")

    const [story, setStory] = useState<string[]>([])

    const methods = useForm<UpdatePoemDTO>({
        defaultValues: {
            title: "",
            author: "",
            poemType: "",
            category: "",
            show: true,
            story: []
        },
        resolver: zodResolver(updatePoemSchema),
        mode: "all",
    });

    useEffect(() => {
        if (!isLoading) {
            methods.setValue("title", data?.data?.title)
            methods.setValue("author", (data?.data?.author as UserResponse)._id)
            methods.setValue("poemType", (data?.data?.poemType as PoemTypeResponse)._id)
            methods.setValue("story", data?.data?.story)
            methods.setValue("show", data?.data?.show)
            methods.setValue("category", (data?.data?.category as CategoryResponse)._id)
            setStory(data?.data?.story ?? [])            
        }
    }, [data,isLoading])

    const onSubmit = (data: UpdatePoemDTO) => {
        if (!poemId) return

        updatePoem({ id: poemId, data: { ...data, story } }, {
            onSuccess: () => {
                closeModal(MODALS.EDIT_POEM);
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
            title="ویرایش"
            open={modals[MODALS.EDIT_POEM]?.open ?? false}
            onClose={() => closeModal(MODALS.EDIT_POEM)}
        >
            <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2 p-2 items-center">
                    <Field.Text
                        name="title"
                        label="نام"
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
