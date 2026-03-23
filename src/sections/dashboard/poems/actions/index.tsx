import { useModal } from "@/hooks";
import DashboardPoemAddModal from "./add";
import DashboardPoemEditModal from "./edit";


export default function ShowModals() {
    const { modals, closeModal } = useModal();

    return (
        <>
            {modals.ADD_POEM?.open && <DashboardPoemAddModal />}
            {modals.EDIT_POEM?.open && <DashboardPoemEditModal />}
            {/* {modals.POEM_STORY?.open && <DashboardPoemEditModal />} */}
        </>
    )
}