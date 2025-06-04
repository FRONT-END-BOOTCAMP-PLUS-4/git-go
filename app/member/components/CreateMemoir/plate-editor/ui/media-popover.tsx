"use client";

import * as React from "react";

import type { TElement, WithRequiredKey } from "@udecode/plate";

import { urlToS3Key } from "@/lib/plate-utils";
import {
    FloatingMedia as FloatingMediaPrimitive,
    FloatingMediaStore,
    useFloatingMediaValue,
    useImagePreviewValue,
} from "@udecode/plate-media/react";
import {
    useEditorRef,
    useEditorSelector,
    useElement,
    useReadOnly,
    useRemoveNodeButton,
    useSelected,
} from "@udecode/plate/react";
import { cva } from "class-variance-authority";
import { Link, Trash2Icon } from "lucide-react";
import { Button, buttonVariants } from "./button";
import { CaptionButton } from "./caption";
import { Popover, PopoverAnchor, PopoverContent } from "./popover";
import { Separator } from "./separator";

const inputVariants = cva(
    "flex h-[28px] w-full rounded-md border-none bg-transparent px-1.5 py-1 text-base placeholder:text-muted-foreground focus-visible:ring-transparent focus-visible:outline-none md:text-sm"
);

export interface MediaPopoverProps {
    children: React.ReactNode;
    plugin: WithRequiredKey;
}

export function MediaPopover({ children, plugin }: MediaPopoverProps) {
    const editor = useEditorRef();
    const readOnly = useReadOnly();
    const selected = useSelected();

    const selectionCollapsed = useEditorSelector(
        (editor) => !editor.api.isExpanded(),
        []
    );
    const isImagePreviewOpen = useImagePreviewValue("isOpen", editor.id);
    const isOpen =
        !readOnly && selected && selectionCollapsed && !isImagePreviewOpen;
    const isEditing = useFloatingMediaValue("isEditing");

    React.useEffect(() => {
        if (!isOpen && isEditing) {
            FloatingMediaStore.set("isEditing", false);
        }
    }, [isOpen, isEditing]);

    const element = useElement<TElement & { url: string; key?: string }>();

    const { props: buttonProps } = useRemoveNodeButton({ element });
    const { onClick: removeOnClick, onMouseDown: defaultOnMouseDown } =
        buttonProps;

    const handleDeleteImage = React.useCallback(
        async (e: React.MouseEvent<HTMLButtonElement>) => {
            defaultOnMouseDown?.(e);

            const fullUrl = element.url as string;
            const s3Key = element.key
                ? (element.key as string)
                : urlToS3Key(fullUrl);

            if (!s3Key) {
                return;
            }

            try {
                const res = await fetch(
                    `/api/upload?key=${encodeURIComponent(s3Key)}`,
                    {
                        method: "DELETE",
                    }
                );
                if (!res.ok) {
                    return;
                }
                removeOnClick?.();
            } catch {
                // 실패 시 조용히 무시하거나, 필요시 에러 처리
            }
        },
        [element, removeOnClick, defaultOnMouseDown]
    );

    if (readOnly) return <>{children}</>;

    return (
        <Popover open={isOpen} modal={false}>
            <PopoverAnchor>{children}</PopoverAnchor>

            <PopoverContent
                className="w-auto p-1"
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                {isEditing ? (
                    <div className="flex w-[330px] flex-col">
                        <div className="flex items-center">
                            <div className="text-muted-foreground flex items-center pr-1 pl-2">
                                <Link className="size-4" />
                            </div>

                            <FloatingMediaPrimitive.UrlInput
                                className={inputVariants()}
                                placeholder="Paste the embed link..."
                                options={{ plugin }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="box-content flex items-center">
                        <FloatingMediaPrimitive.EditButton
                            className={buttonVariants({
                                size: "sm",
                                variant: "ghost",
                            })}
                        >
                            Edit link
                        </FloatingMediaPrimitive.EditButton>

                        <CaptionButton variant="ghost">Caption</CaptionButton>

                        <Separator
                            orientation="vertical"
                            className="mx-1 h-6"
                        />

                        <Button
                            size="icon"
                            variant="ghost"
                            onMouseDown={(e) => {
                                defaultOnMouseDown?.(e);
                            }}
                            onClick={handleDeleteImage}
                        >
                            <Trash2Icon />
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}
