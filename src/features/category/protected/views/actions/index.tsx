import { useModal } from "@/hooks";
import DashboardCategoryAddModal from "./add";
import DashboardCategoryEditModal from "./edit";


export default function ShowModals() {
    const { modals, closeModal } = useModal();

    return (
        <>
            {modals.ADD_CATEGORY?.open && <DashboardCategoryAddModal />}
            {modals.EDIT_CATEGORY?.open && <DashboardCategoryEditModal />}
        </>
    )
}