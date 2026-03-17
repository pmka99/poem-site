"use client";

import { ConfirmContext, ConfirmFn } from "@/contexts/confirmContext";
import { useEffect, useRef, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";

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

    useEffect(() => {
        return () => {
            resolverRef.current?.(false);
        };
    }, []);

    return (
        <ConfirmContext.Provider value={confirm}>
            {children}

            <Dialog
                className="*:font-serif!"
                open={!!state}
                onClose={() => close(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>تأیید عملیات</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        {state?.message}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => close(false)} color="inherit">
                        انصراف
                    </Button>

                    <Button
                        onClick={() => close(true)}
                        color="error"
                        variant="contained"
                        autoFocus
                    >
                        تأیید
                    </Button>
                </DialogActions>
            </Dialog>
        </ConfirmContext.Provider>
    );
}
