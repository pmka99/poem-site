import { useModal } from "@/hooks";
import DashboardPoemTypeAddModal from "./add";
import DashboardPoemTypeEditModal from "./edit";


export default function ShowModals() {
    const { modals, closeModal } = useModal();

    return (
        <>
            {modals.ADD_POEMTYPE?.open && <DashboardPoemTypeAddModal />}
            {modals.EDIT_POEMTYPE?.open && <DashboardPoemTypeEditModal />}
        </>
    )
}