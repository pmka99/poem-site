"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";

import { Form } from "@/components/form/formProvider";
import { Field } from "@/components/form";
import CustomModal from "@/components/modals/customModal";

import { useModal } from "@/hooks";
import { MODALS } from "@/types/modals";

import { useEffect } from "react";
import { useHemistich, useUpdateHemistich } from "@/features/poem/protected/hooks";
import { UpdateHemistichDTO } from "@/shared/types/hemistich.type";
import { updateHemistichSchema } from "@/shared/schemas/hemistich.schema";

export default function DashboardHemistichEditModal() {
    const { modals, closeModal } = useModal();

    const poemId = modals[MODALS.EDIT_HEMISTICH]?.data?.poemId ?? "";
    const hemistichId = modals[MODALS.EDIT_HEMISTICH]?.data?.hemistichId ?? "";

    const { mutate: updatePoem, isPending } =
        useUpdateHemistich(poemId);

    const { data, isLoading } = useHemistich(poemId, hemistichId)

    const methods = useForm<UpdateHemistichDTO>({
        defaultValues: {
            text: "",
            show: true,
        },
        resolver: zodResolver(updateHemistichSchema),
        mode: "all",
    });

    useEffect(() => {
        methods.setValue("text", data?.data?.text);
        methods.setValue("show", data?.data?.show);
        methods.setValue("chapterTitle", data?.data?.chapterTitle);
        methods.setValue("description", data?.data?.description);
    }, [data])

    const onSubmit = (data: UpdateHemistichDTO) => {

        updatePoem({ hemistichId, data }, {
            onSuccess: () => {
                closeModal(MODALS.EDIT_HEMISTICH);
                methods.reset();
            },
        });
    };


    return (
        <CustomModal
            title="ویرایش"
            open={modals[MODALS.EDIT_HEMISTICH]?.open ?? false}
            onClose={() => closeModal(MODALS.EDIT_HEMISTICH)}
        >
            <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2 p-2 items-center">
                    <Field.Text
                        name="text"
                        label="متن"
                    />

                    <Field.Text
                        name="chapterTitle"
                        label="عنوان"
                    />

                    <Field.Text
                        name="description"
                        label="توضیحات"
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
