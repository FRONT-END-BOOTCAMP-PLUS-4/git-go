"use client";

import { FloatingToolbar } from "@/plate-editor/ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/plate-editor/ui/floating-toolbar-buttons";
import { createPlatePlugin } from "@udecode/plate/react";

export const FloatingToolbarPlugin = createPlatePlugin({
    key: "floating-toolbar",
    render: {
        afterEditable: () => (
            <FloatingToolbar>
                <FloatingToolbarButtons />
            </FloatingToolbar>
        ),
    },
});
