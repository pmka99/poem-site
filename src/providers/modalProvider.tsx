import { ModalContext, ModalState } from "@/contexts/modalContext";
import { ModalName, ModalPayloadMap } from "@/types/modals";
import { useState } from "react";

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [modals, setModals] = useState<ModalState>({});

    const openModal = <T extends keyof ModalPayloadMap>(
        name: T,
        data?: ModalPayloadMap[T]
    ) => {
        setModals((prev) => ({
            ...prev,
            [name]: { open: true, data },
        }));
    };

    const closeModal = (name: keyof ModalPayloadMap) => {
        setModals((prev) => ({
            ...prev,
            [name]: { ...prev[name], open: false },
        }));
    };

    return (
        <ModalContext.Provider value={{ modals, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
}

