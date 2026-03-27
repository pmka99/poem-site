"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";

import { Form } from "@/components/form/formProvider";
import { Field } from "@/components/form";
import CustomModal from "@/components/modals/customModal";

import { useModal } from "@/hooks";
import { MODALS } from "@/types/modals";

import { createPoemTypeSchema } from "@/shared/schemas/poemType.schema";
import { CreatePoemTypeDTO } from "@/shared/types/poemType.type";

import { useCreatePoemType } from "@/features/poemType/protected/hooks";


export default function DashboardPoemTypeAddModal() {
    const { modals, closeModal } = useModal();

    const { mutate: createPoemType, isPending } =
        useCreatePoemType();

    const methods = useForm<CreatePoemTypeDTO>({
        defaultValues: {
            name: "",
            description: "",
            layout: 2,
        },
        resolver: zodResolver(createPoemTypeSchema),
        mode: "all",
    });

    const onSubmit: SubmitHandler<CreatePoemTypeDTO> = (data) => {
        createPoemType(data, {
            onSuccess: () => {
                closeModal(MODALS.ADD_POEMTYPE);
                methods.reset();
            },
        });
    };

    const items = [
        { label: "یکی", id: 1 },
        { label: "دو تایی", id: 2 },
        { label: "چهار تایی", id: 4 },
        { label: "پنج تایی", id: 5 }
    ]
    
    return (
        <CustomModal
            title="افزودن"
            open={modals[MODALS.ADD_POEMTYPE]?.open ?? false}
            onClose={() => closeModal(MODALS.ADD_POEMTYPE)}
        >
            <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2 p-2 items-center">
                    <Field.Text
                        name="name"
                        label="نام"
                    />

                    <Field.Select
                        name="layout"
                        label="چیدمان"
                        items={items}
                    />

                    <Field.Text
                        name="description"
                        label="توضیحات"
                        rows={3}
                        multiline
                    />

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
