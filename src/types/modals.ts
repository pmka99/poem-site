import { Position } from "@/enum/poem";

export const MODALS = {
    LOGIN: "LOGIN",
    REGISTER: "REGISTER",

    ADD_POEMTYPE: "ADD_POEMTYPE",
    EDIT_POEMTYPE: "EDIT_POEMTYPE",

    ADD_CATEGORY: "ADD_CATEGORY",
    EDIT_CATEGORY: "EDIT_CATEGORY",

    ADD_POEM: "ADD_POEM",
    EDIT_POEM: "EDIT_POEM",

    ADD_HEMISTICH: "ADD_HEMISTICH",
    EDIT_HEMISTICH: "EDIT_HEMISTICH"

} as const;

export type ModalName = (typeof MODALS)[keyof typeof MODALS];


export type ModalPayloadMap = {
    [MODALS.LOGIN]: undefined;
    [MODALS.REGISTER]: undefined;

    [MODALS.ADD_POEMTYPE]: undefined;
    [MODALS.EDIT_POEMTYPE]: {
        poemTypeId: string;
    };

    [MODALS.ADD_CATEGORY]: undefined;
    [MODALS.EDIT_CATEGORY]: {
        categoryId: string;
    };

    [MODALS.ADD_POEM]: undefined;
    [MODALS.EDIT_POEM]: {
        poemId: string;
    };

    [MODALS.ADD_HEMISTICH]: {
        poemId: string;
        hemistichId?: string;
        position: Position;
    };

    [MODALS.EDIT_HEMISTICH]: {
        poemId: string;
        hemistichId: string;
    };

};
