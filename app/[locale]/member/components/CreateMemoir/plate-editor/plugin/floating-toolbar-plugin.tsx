"use client";

import { FloatingToolbar } from "@/app/[locale]/member/components/CreateMemoir/plate-editor/ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/app/[locale]/member/components/CreateMemoir/plate-editor/ui/floating-toolbar-buttons";
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
