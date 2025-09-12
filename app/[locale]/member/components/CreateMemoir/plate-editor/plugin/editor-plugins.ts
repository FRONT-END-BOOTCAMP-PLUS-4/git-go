"use client";

import {
    FixedToolbarPlugin,
    FloatingToolbarPlugin,
    alignPlugin,
    autoformatPlugin,
    dndPlugins,
    exitBreakPlugin,
    indentListPlugins,
    lineHeightPlugin,
    linkPlugin,
    markdownPlugin,
    resetBlockTypePlugin,
    softBreakPlugin,
    suggestionPlugin,
    tablePlugin,
    tocPlugin,
} from "./index";
import {
    FontBackgroundColorPlugin,
    FontColorPlugin,
    FontSizePlugin,
} from "@udecode/plate-font/react";
import { all, createLowlight } from "lowlight";

import { BasicElementsPlugin } from "@udecode/plate-basic-elements/react";
import { BasicMarksPlugin } from "@udecode/plate-basic-marks/react";
import { BlockSelectionPlugin } from "@udecode/plate-selection/react";
import { CalloutPlugin } from "@udecode/plate-callout/react";
import { CodeBlockPlugin } from "@udecode/plate-code-block/react";
import { ColumnPlugin } from "@udecode/plate-layout/react";
import { DocxPlugin } from "@udecode/plate-docx";
import { EmojiPlugin } from "@udecode/plate-emoji/react";
import { HighlightPlugin } from "@udecode/plate-highlight/react";
import { HorizontalRulePlugin } from "@udecode/plate-horizontal-rule/react";
import { JuicePlugin } from "@udecode/plate-juice";
import { NodeIdPlugin } from "@udecode/plate-node-id";
import { SlashPlugin } from "@udecode/plate-slash-command/react";
import { TogglePlugin } from "@udecode/plate-toggle/react";
import { TrailingBlockPlugin } from "@udecode/plate-trailing-block";
import emojiMartData from "@emoji-mart/data";
import { mediaPlugins } from "./media-plugins";

const lowlight = createLowlight(all);

export const viewPlugins = [
    // 글씨
    BasicElementsPlugin,
    BasicMarksPlugin,
    CalloutPlugin,
    FontColorPlugin,
    FontBackgroundColorPlugin,
    FontSizePlugin,
    HighlightPlugin,
    linkPlugin,

    // 코드
    CodeBlockPlugin.configure({ options: { lowlight } }),

    // column
    ColumnPlugin,

    // 정렬
    alignPlugin,
    ...indentListPlugins,
    lineHeightPlugin,

    HorizontalRulePlugin,

    // 테이블
    tablePlugin,
    tocPlugin,

    // 이미지
    ...mediaPlugins,

    // 토글
    TogglePlugin,

    BlockSelectionPlugin,
    NodeIdPlugin,

    suggestionPlugin,

    // skipMarkPlugin,
] as const;

export const editorPlugins = [
    ...viewPlugins,

    autoformatPlugin,

    ...dndPlugins,

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    EmojiPlugin.configure({ options: { data: emojiMartData as any } }),
    exitBreakPlugin,

    markdownPlugin,

    resetBlockTypePlugin,

    SlashPlugin.extend({
        options: {
            triggerQuery(editor) {
                return !editor.api.some({
                    match: { type: editor.getType(CodeBlockPlugin) },
                });
            },
        },
    }),
    softBreakPlugin,

    TrailingBlockPlugin,

    DocxPlugin,
    JuicePlugin,

    // UI
    FixedToolbarPlugin,
    FloatingToolbarPlugin,
];
