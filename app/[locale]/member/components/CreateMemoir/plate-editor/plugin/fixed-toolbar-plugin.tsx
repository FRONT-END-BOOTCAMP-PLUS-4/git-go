"use client";

import { FixedToolbar } from "@/app/[locale]/member/components/CreateMemoir/plate-editor/ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/app/[locale]/member/components/CreateMemoir/plate-editor/ui/fixed-toolbar-buttons";
import { createPlatePlugin } from "@udecode/plate/react";

export const FixedToolbarPlugin = createPlatePlugin({
    key: "fixed-toolbar",
    render: {
        beforeEditable: () => (
            <FixedToolbar>
                <FixedToolbarButtons />
            </FixedToolbar>
        ),
    },
});
