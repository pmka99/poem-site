"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";

import { Form } from "@/components/form/formProvider";
import { Field } from "@/components/form";
import CustomModal from "@/components/modals/customModal";

import { useModal } from "@/hooks";
import { MODALS } from "@/types/modals";


import { useCreateHemistich } from "@/features/poem/protected/hooks";
import { CreateHemistichDTO } from "@/shared/types/hemistich.type";
import { createHemistichSchema } from "@/shared/schemas/hemistich.schema";


export default function DashboardHemistichAddModal() {
    const { modals, closeModal } = useModal();

    const poemId = modals[MODALS.ADD_HEMISTICH]?.data?.poemId ?? "";
    const hemistichId = modals[MODALS.ADD_HEMISTICH]?.data?.hemistichId
    const position = modals[MODALS.ADD_HEMISTICH]?.data?.position

    const { mutate: createHemistich, isPending } =
        useCreateHemistich(poemId);


    const methods = useForm<CreateHemistichDTO>({
        defaultValues: {
            text: "",
            show: true,
            position: position,
            targetHemistichId: hemistichId
        },
        resolver: zodResolver(createHemistichSchema),
        mode: "all",
    });

    const onSubmit: SubmitHandler<CreateHemistichDTO> = (data) => {
        
        createHemistich(data, {
            onSuccess: () => {
                closeModal(MODALS.ADD_HEMISTICH);
                methods.reset();
            },
        });
    };


    return (
        <CustomModal
            title="افزودن"
            open={modals[MODALS.ADD_HEMISTICH]?.open ?? false}
            onClose={() => closeModal(MODALS.ADD_HEMISTICH)}
        >
            <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2 p-2 items-center">
                    <Field.Text
                        name="text"
                        label="متن"
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
