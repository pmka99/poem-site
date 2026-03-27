"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";

import { Form } from "@/components/form/formProvider";
import { Field } from "@/components/form";
import CustomModal from "@/components/modals/customModal";

import { useModal } from "@/hooks";
import { MODALS } from "@/types/modals";

import { updateCategorySchema } from "@/shared/schemas/category.schema";
import { UpdateCategoryDTO } from "@/shared/types/category.type";

import { useEffect } from "react";
import { useCategory, useUpdateCategory } from "@/features/category/protected/hooks";

export default function DashboardCategoryEditModal() {
    const { modals, closeModal } = useModal();

    const categoryId = modals[MODALS.EDIT_CATEGORY]?.data?.categoryId;

    const { mutate: updateCategory, isPending } =
        useUpdateCategory();

    const { data, isLoading } = useCategory(categoryId ?? "")

    const methods = useForm<UpdateCategoryDTO>({
        defaultValues: {
            title: "",
            description: "",
        },
        resolver: zodResolver(updateCategorySchema),
        mode: "all",
    });

    useEffect(() => {
        methods.setValue("title", data?.data?.title)
        methods.setValue("description", data?.data?.description)
    }, [data])

    const onSubmit = (data: UpdateCategoryDTO) => {
        if (!categoryId) return

        updateCategory({ id: categoryId, data }, {
            onSuccess: () => {
                closeModal(MODALS.EDIT_CATEGORY);
                methods.reset();
            },
        });
    };

    return (
        <CustomModal
            title="ویرایش"
            open={modals[MODALS.EDIT_CATEGORY]?.open ?? false}
            onClose={() => closeModal(MODALS.EDIT_CATEGORY)}
        >
            <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2 p-2 items-center">
                    <Field.Text
                        name="title"
                        label="نام"
                    />

                    <Field.Text
                        name="description"
                        label="توضیحات"
                        rows={3}
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
