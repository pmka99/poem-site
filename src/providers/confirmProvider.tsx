"use client";

import { ConfirmContext, ConfirmFn } from "@/contexts/confirmContext";
import { useEffect, useRef, useState } from "react";

type ConfirmState = {
    message: string;
};

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<ConfirmState | null>(null);
    const resolverRef = useRef<((v: boolean) => void) | null>(null);

    const confirm: ConfirmFn = (message) => {
        if (state) {
            return Promise.resolve(false); // جلوگیری از confirm همزمان
        }

        return new Promise<boolean>((resolve) => {
            resolverRef.current = resolve;
            setState({ message });
        });
    };

    function close(result: boolean) {
        resolverRef.current?.(result);
        resolverRef.current = null;
        setState(null);
    }

    // cleanup اگر provider unmount شد
    useEffect(() => {
        return () => {
            resolverRef.current?.(false);
        };
    }, []);

    return (
        <ConfirmContext.Provider value={confirm}>
            {children}

            {state && (
                <div className="modal">
                    <p>{state.message}</p>

                    <button onClick={() => close(true)}>Yes</button>
                    <button onClick={() => close(false)}>No</button>
                </div>
            )}
        </ConfirmContext.Provider>
    );
}
