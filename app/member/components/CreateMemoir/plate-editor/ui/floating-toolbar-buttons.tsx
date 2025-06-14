"use client";

import {
    BoldPlugin,
    CodePlugin,
    ItalicPlugin,
    StrikethroughPlugin,
    UnderlinePlugin,
} from "@udecode/plate-basic-marks/react";
import { useEditorReadOnly } from "@udecode/plate/react";
import {
    BoldIcon,
    Code2Icon,
    ItalicIcon,
    StrikethroughIcon,
    UnderlineIcon,
} from "lucide-react";

import { MarkToolbarButton } from "./mark-toolbar-button";
import { ToolbarGroup } from "./toolbar";
import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu";

export function FloatingToolbarButtons() {
    const readOnly = useEditorReadOnly();

    return (
        <>
            {!readOnly && (
                <>
                    <ToolbarGroup>
                        <TurnIntoDropdownMenu />

                        <MarkToolbarButton
                            nodeType={BoldPlugin.key}
                            tooltip="Bold (⌘+B)"
                        >
                            <BoldIcon />
                        </MarkToolbarButton>

                        <MarkToolbarButton
                            nodeType={ItalicPlugin.key}
                            tooltip="Italic (⌘+I)"
                        >
                            <ItalicIcon />
                        </MarkToolbarButton>

                        <MarkToolbarButton
                            nodeType={UnderlinePlugin.key}
                            tooltip="Underline (⌘+U)"
                        >
                            <UnderlineIcon />
                        </MarkToolbarButton>

                        <MarkToolbarButton
                            nodeType={StrikethroughPlugin.key}
                            tooltip="Strikethrough (⌘+⇧+M)"
                        >
                            <StrikethroughIcon />
                        </MarkToolbarButton>

                        <MarkToolbarButton
                            nodeType={CodePlugin.key}
                            tooltip="Code (⌘+E)"
                        >
                            <Code2Icon />
                        </MarkToolbarButton>

                        {/* <ColorDropdownMenu
              nodeType={FontColorPlugin.key}
              tooltip="Text color"
            >
              <BaselineIcon />
            </ColorDropdownMenu>

            <ColorDropdownMenu
              nodeType={FontBackgroundColorPlugin.key}
              tooltip="Background color"
            >
              <PaintBucketIcon />
            </ColorDropdownMenu> */}

                        {/* <LinkToolbarButton /> */}
                    </ToolbarGroup>
                </>
            )}
        </>
    );
}
