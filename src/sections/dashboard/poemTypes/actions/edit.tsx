"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";

import { Form } from "@/components/form/formProvider";
import { Field } from "@/components/form";
import CustomModal from "@/components/modals/customModal";

import { useModal } from "@/hooks";
import { MODALS } from "@/types/modals";

import { updatePoemTypeSchema } from "@/shared/schemas/poemType.schema";
import { UpdatePoemTypeDTO } from "@/shared/types/poemType.type";

import { LayoutPoemType } from "@/enum/poemType";

import { useEffect } from "react";
import { usePoemType, useUpdatePoemType } from "@/features/poemType/protected/hooks";

export default function DashboardPoemTypeEditModal() {
    const { modals, closeModal } = useModal();

    const poemTypeId = modals[MODALS.EDIT_POEMTYPE]?.data?.poemTypeId;

    const { mutate: updatePoemType, isPending } =
        useUpdatePoemType();

    const { data, isLoading } = usePoemType(poemTypeId ?? "")

    const methods = useForm<UpdatePoemTypeDTO>({
        defaultValues: {
            name: "",
            description: "",
            layout: LayoutPoemType.COUPLET,
        },
        resolver: zodResolver(updatePoemTypeSchema),
        mode: "all",
    });

    useEffect(() => {
        methods.setValue("name", data?.data?.name)
        methods.setValue("description", data?.data?.description)
        methods.setValue("layout", data?.data?.layout)
    }, [data])

    const onSubmit = (data: UpdatePoemTypeDTO) => {
        if (!poemTypeId) return

        updatePoemType({ id: poemTypeId, data }, {
            onSuccess: () => {
                closeModal(MODALS.EDIT_POEMTYPE);
                methods.reset();
            },
        });
    };

    return (
        <CustomModal
            title="ویرایش"
            open={modals[MODALS.EDIT_POEMTYPE]?.open ?? false}
            onClose={() => closeModal(MODALS.EDIT_POEMTYPE)}
        >
            <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2 p-2 items-center">
                    <Field.Text
                        name="name"
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
