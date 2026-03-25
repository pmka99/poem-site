import { useHemistichController, HemistichMode } from "../hooks/logic/useHemistichController";
import { HemistichContext } from "../context/hemistichContext";

export function HemistichProvider({
    poemId,
    mode = "infinite",
    children,
}: {
    poemId: string;
    mode?: HemistichMode;
    children: React.ReactNode;
}) {

    const controller = useHemistichController(poemId, mode);

    return (
        <HemistichContext.Provider value={controller}>
            {children}
        </HemistichContext.Provider>
    );
}
