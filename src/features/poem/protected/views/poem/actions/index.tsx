import { useModal } from "@/hooks";
import DashboardPoemAddModal from "./add";
import DashboardPoemEditModal from "./edit";
import { MODALS } from "@/types/modals";


export default function ShowModals() {
    const { modals, closeModal } = useModal();

    return (
        <>
            {modals[MODALS.ADD_POEM]?.open && <DashboardPoemAddModal />}
            {modals[MODALS?.EDIT_POEM]?.open && <DashboardPoemEditModal />}
            {/* {modals.POEM_STORY?.open && <DashboardPoemEditModal />} */}
        </>
    )
}