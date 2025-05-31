"use client";

import type { PlateElementProps } from "@udecode/plate/react";

import { PlateElement } from "@udecode/plate/react";
import { type VariantProps, cva } from "class-variance-authority";

const headingVariants = cva("relative mb-1", {
    variants: {
        variant: {
            h1: "pb-1 font-heading text-4xl font-bold",
            h2: "pb-px font-heading text-2xl font-semibold tracking-tight",
            h3: "pb-px font-heading text-xl font-semibold tracking-tight",
            h4: "font-heading text-lg font-semibold tracking-tight",
            h5: "text-lg font-semibold tracking-tight",
            h6: "text-base font-semibold tracking-tight",
        },
    },
});

export function HeadingElement({
    variant = "h1",
    ...props
}: PlateElementProps & VariantProps<typeof headingVariants>) {
    return (
        <PlateElement
            as={variant!}
            className={headingVariants({ variant })}
            {...props}
        >
            {props.children}
        </PlateElement>
    );
}
