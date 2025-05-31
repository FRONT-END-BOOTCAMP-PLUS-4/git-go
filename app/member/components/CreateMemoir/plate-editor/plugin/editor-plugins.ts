"use client";

import { HighlightPlugin } from "@udecode/plate-highlight/react";
import { HorizontalRulePlugin } from "@udecode/plate-horizontal-rule/react";
import { TogglePlugin } from "@udecode/plate-toggle/react";

import { DocxPlugin } from "@udecode/plate-docx";

import emojiMartData from "@emoji-mart/data";
import { BasicElementsPlugin } from "@udecode/plate-basic-elements/react";
import { BasicMarksPlugin } from "@udecode/plate-basic-marks/react";
import { CodeBlockPlugin } from "@udecode/plate-code-block/react";

import { CalloutPlugin } from "@udecode/plate-callout/react";
import { EmojiPlugin } from "@udecode/plate-emoji/react";
import { JuicePlugin } from "@udecode/plate-juice";

import {
    FontBackgroundColorPlugin,
    FontColorPlugin,
    FontSizePlugin,
} from "@udecode/plate-font/react";
import { ColumnPlugin } from "@udecode/plate-layout/react";
import { SlashPlugin } from "@udecode/plate-slash-command/react";
import { TrailingBlockPlugin } from "@udecode/plate-trailing-block";

import { all, createLowlight } from "lowlight";

import { NodeIdPlugin } from "@udecode/plate-node-id";
import {
    alignPlugin,
    autoformatPlugin,
    dndPlugins,
    exitBreakPlugin,
    FixedToolbarPlugin,
    FloatingToolbarPlugin,
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

    // BlockSelectionPlugin,
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
