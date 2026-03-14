"use client";

import { Button } from "@mui/material";
import { useModal } from "@/hooks";
import CustomModal from "@/components/modals/customModal";
import { MODALS } from "@/types/modals";

export default function DashboardPoemTypeAddModal() {
    const { modals, openModal, closeModal } = useModal();

    return (
        <>
            <Button onClick={() => openModal(MODALS.ADD_POEMTYPE)}>
                open modal
            </Button>

            <CustomModal
                open={modals[MODALS.ADD_POEMTYPE] ?? false}
                onClose={() => closeModal(MODALS.ADD_POEMTYPE)}
            >
                login form
            </CustomModal>
        </>
    );
}
