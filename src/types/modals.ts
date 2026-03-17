export const MODALS = {
    LOGIN: "LOGIN",
    REGISTER: "REGISTER",
    ADD_POEMTYPE: "ADD_POEMTYPE",
    EDIT_POEMTYPE: "EDIT_POEMTYPE",
} as const;

export type ModalName = (typeof MODALS)[keyof typeof MODALS];


export type ModalPayloadMap = {
    [MODALS.LOGIN]: undefined;

    [MODALS.REGISTER]: undefined;

    [MODALS.ADD_POEMTYPE]: undefined;

    [MODALS.EDIT_POEMTYPE]: {
        poemTypeId: string;
    };
};
