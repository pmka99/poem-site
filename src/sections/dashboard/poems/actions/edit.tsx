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
import StoryBox from "./components/story";

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
            poemType: ""
        },
        resolver: zodResolver(updatePoemSchema),
        mode: "all",
    });

    useEffect(() => {
        methods.setValue("title", data?.data?.title)
        methods.setValue("author", data?.data?.author as string)
        methods.setValue("poemType", data?.data?.poemType as string)
        methods.setValue("story", data?.data?.story)
        setStory(data?.data?.story ?? [])
    }, [data])

    const onSubmit = (data: UpdatePoemDTO) => {
        if (!poemId) return

        updatePoem({ id: poemId, data: { ...data, story } }, {
            onSuccess: () => {
                closeModal(MODALS.EDIT_POEM);
                methods.reset();
            },
        });
    };

    const { data: poemTypes, isLoading: isLoadingPoemTypes } = usePoemTypes();

    const items = poemTypes?.data?.map(item => ({ id: item._id, label: item.name })
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
                        items={items}
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
