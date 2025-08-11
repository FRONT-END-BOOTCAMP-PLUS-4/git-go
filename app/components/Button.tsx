"use client";

import type { ReactNode } from "react";

export type ButtonStyleType = "default" | "lined" | "disabled" | "danger";
export type ButtonSize = "regular" | "full";

interface ButtonProps {
    type?: ButtonStyleType;
    size?: ButtonSize;
    htmlType?: "button" | "submit" | "reset";
    children?: ReactNode;
    label?: string;
    onClick?: () => void;
    icon?: ReactNode;
    isLoading?: boolean;
}

const typeClassMap: Record<ButtonStyleType, string> = {
    default:
        "bg-[var(--color-primary7)] text-white hover:bg-[var(--color-primary8)] cursor-pointer ",
    lined: "border border-[var(--color-border-primary1)] text-text-1 hover:bg-bg-primary1 cursor-pointer bg-transparent",
    disabled:
        "bg-[var(--color-border-primary2)] text-[var(--color-text-secondary2)] cursor-not-allowed bg-transparent",
    danger: "bg-[var(--color-danger1)] text-white hover:bg-[var(--color-danger2)] cursor-pointer ",
};

const sizeClassMap: Record<ButtonSize, string> = {
    regular: "",
    full: "w-full flex items-center justify-center",
};

export default function Button({
    type = "default",
    size = "regular",
    htmlType = "button",
    children,
    label,
    onClick,
    icon,
    isLoading,
}: ButtonProps) {
    const isDisabled = type === "disabled" || isLoading;
    const styleClass = typeClassMap[type];
    const sizeClass = sizeClassMap[size];

    return (
        <button
            type={htmlType}
            onClick={onClick}
            disabled={isDisabled}
            className={`shadow-border-primary1 flex items-center gap-x-2 rounded-md px-3 py-2.5 text-xs font-semibold shadow-xs transition-colors active:scale-[0.97] ${styleClass} ${sizeClass}`}
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children ?? label}
        </button>
    );
}
