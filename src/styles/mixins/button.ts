import { cva } from "styled-system/css/cva.mjs";

export const button = cva({
    base: {
        rounded: "8px",
        transition: "all 0.2s",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        cursor: "pointer",
        color: "primary.normal",
    },
    variants: {
        hierarchy: {
            primary: {
                background: "primary.normal",
                color: "white",
                "&:hover": {
                    boxShadow: "0px 2px 16px 0px #7580ea",
                },
                "&:active": {
                    background: "primary.dark",
                },
            },
            secondary: {
                background: "white",
                color: "primary.normal",
                border: "1.5px solid",
                borderColor: "primary.30",
                "&:hover": {
                    background: "primary.10",
                    border: "1.5px solid",
                    borderColor: "primary.50",
                },
            },
            normal: {
                background: "primary.10",
                color: "primary.normal",
                "&:hover": {
                    background: "primary.20",
                },
            },
            default: {
                background: "white",
                color: "gray.600",
                "&:hover": {
                    backgroundColor: "gray.100",
                },
            },
            disabled: {
                background: "gray.100",
                color: "gray.300",
                pointerEvents: "none",
            },
        },
        size: {
            sm: {
                height: "40px",
                width: "40px",
            },
            md: {
                height: "56px",
                width: "56px",
            },
        },
    },
    defaultVariants: {
        hierarchy: "primary",
        size: "sm",
    },
});
