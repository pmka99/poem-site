import { ModalContext, ModalState } from "@/contexts/ModalContext";
import { ModalName } from "@/types/modals";
import { useState } from "react";

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [modals, setModals] = useState<ModalState>({});

    const openModal = (name: ModalName) =>
        setModals((prev) => ({ ...prev, [name]: true }));

    const closeModal = (name: ModalName) =>
        setModals((prev) => ({ ...prev, [name]: false }));

    return (
        <ModalContext.Provider value={{ modals, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
}
