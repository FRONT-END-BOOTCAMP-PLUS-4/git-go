"use client";

import { LinkFloatingToolbar } from "@/app/member/components/CreateMemoir/plate-editor/ui/link-floating-toolbar";
import { LinkPlugin } from "@udecode/plate-link/react";

export const linkPlugin = LinkPlugin.extend({
    render: { afterEditable: () => <LinkFloatingToolbar /> },
});
