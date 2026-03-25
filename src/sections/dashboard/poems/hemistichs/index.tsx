"use client";

import { useViewMode, useModal } from "@/hooks";
import ViewModeSwitcher from "@/features/poem/protected/components/ViewModeSwitcher";

import { MODALS } from "@/types/modals";

import { HemistichProvider } from "@/features/poem/protected/provider/HemistichProvider";

import PaginationHemistichView from "./paginationView";
import InfiniteHemistichView from "./infiniteScrollView";

import DashboardHemistichAddModal from "./actions/add";
import DashboardHemistichEditModal from "./actions/edit";

export default function DashboardPoemsHemistichView({
    poemId,
}: {
    poemId: string;
}) {

    const { mode, setMode } = useViewMode();
    const { modals } = useModal();

    return (
        <HemistichProvider
            mode={mode}
            poemId={poemId}>

            <ViewModeSwitcher
                mode={mode}
                onChange={setMode}
            />

            {mode === "pagination" ? (
                <PaginationHemistichView />
            ) : (
                <InfiniteHemistichView />
            )}

            {modals[MODALS.ADD_HEMISTICH]?.open && (
                <DashboardHemistichAddModal />
            )}

            {modals[MODALS.EDIT_HEMISTICH]?.open && (
                <DashboardHemistichEditModal />
            )}

        </HemistichProvider>
    );
}
