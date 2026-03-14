"use client";

import { Modal, Box, Typography, IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";

import { ReactNode } from "react";

type LModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    width?: number | string;
};

export default function CustomModal({
    open,
    onClose,
    title,
    children,
    width = 500,
}: LModalProps) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            keepMounted
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width,
                    maxWidth: "95%",
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 3,
                    outline: "none",
                }}
            >
                {title && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <Typography variant="h6">{title}</Typography>

                        <IconButton onClick={onClose}>
                            <IoClose className="w-6 h-6" />
                        </IconButton>
                    </Box>
                )}

                <Box>{children}</Box>
            </Box>
        </Modal>
    );
}
