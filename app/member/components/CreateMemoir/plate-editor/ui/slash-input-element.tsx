"use client";

import * as React from "react";

import type { TSlashInputElement } from "@udecode/plate-slash-command";

import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { CodeBlockPlugin } from "@udecode/plate-code-block/react";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { TocPlugin } from "@udecode/plate-heading/react";
import { INDENT_LIST_KEYS, ListStyleType } from "@udecode/plate-indent-list";
import { TablePlugin } from "@udecode/plate-table/react";
import { TogglePlugin } from "@udecode/plate-toggle/react";
import {
    type PlateEditor,
    type PlateElementProps,
    ParagraphPlugin,
    PlateElement,
} from "@udecode/plate/react";
import {
    ChevronRightIcon,
    Code2,
    Columns3Icon,
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    LightbulbIcon,
    ListIcon,
    ListOrdered,
    MinusIcon,
    PilcrowIcon,
    Quote,
    Square,
    Table,
    TableOfContentsIcon,
} from "lucide-react";

import { insertBlock } from "@/app/member/components/CreateMemoir/plate-editor/plugin/transforms";
import { CalloutPlugin } from "@udecode/plate-callout/react";
import { HorizontalRulePlugin } from "@udecode/plate-horizontal-rule/react";
import {
    InlineCombobox,
    InlineComboboxContent,
    InlineComboboxEmpty,
    InlineComboboxGroup,
    InlineComboboxGroupLabel,
    InlineComboboxInput,
    InlineComboboxItem,
} from "./inline-combobox";

type Group = {
    group: string;
    items: Item[];
};

interface Item {
    icon: React.ReactNode;
    value: string;
    onSelect: (editor: PlateEditor, value: string) => void;
    className?: string;
    focusEditor?: boolean;
    keywords?: string[];
    label?: string;
}

const groups: Group[] = [
    {
        group: "Basic blocks",
        items: [
            {
                icon: <PilcrowIcon />,
                keywords: ["paragraph"],
                label: "Paragraph",
                value: ParagraphPlugin.key,
            },
            {
                icon: <Heading1Icon />,
                keywords: ["title", "h1"],
                label: "Heading 1",
                value: HEADING_KEYS.h1,
            },
            {
                icon: <Heading2Icon />,
                keywords: ["subtitle", "h2"],
                label: "Heading 2",
                value: HEADING_KEYS.h2,
            },
            {
                icon: <Heading3Icon />,
                keywords: ["subtitle", "h3"],
                label: "Heading 3",
                value: HEADING_KEYS.h3,
            },
            {
                icon: <Table />,
                label: "Table",
                value: TablePlugin.key,
            },
            {
                icon: <Code2 />,
                keywords: ["```"],
                label: "Code Block",
                value: CodeBlockPlugin.key,
            },
            {
                icon: <Quote />,
                keywords: ["citation", "blockquote", "quote", ">"],
                label: "Blockquote",
                value: BlockquotePlugin.key,
            },
            {
                description: "Insert a highlighted block.",
                icon: <LightbulbIcon />,
                keywords: ["note"],
                label: "Callout",
                value: CalloutPlugin.key,
            },
            {
                icon: <MinusIcon />,
                label: "Divider",
                value: HorizontalRulePlugin.key,
            },
        ].map((item) => ({
            ...item,
            onSelect: (editor, value) => {
                insertBlock(editor, value);
            },
        })),
    },
    {
        group: "Lists",
        items: [
            {
                icon: <ListIcon />,
                keywords: ["unordered", "ul", "-"],
                label: "Bulleted list",
                value: ListStyleType.Disc,
            },
            {
                icon: <ListOrdered />,
                keywords: ["ordered", "ol", "1"],
                label: "Numbered list",
                value: ListStyleType.Decimal,
            },
            {
                icon: <Square />,
                keywords: ["checklist", "task", "checkbox", "[]"],
                label: "To-do list",
                value: INDENT_LIST_KEYS.todo,
            },
            {
                icon: <ChevronRightIcon />,
                keywords: ["collapsible", "expandable"],
                label: "Toggle list",
                value: TogglePlugin.key,
            },
        ].map((item) => ({
            ...item,
            onSelect: (editor, value) => {
                insertBlock(editor, value);
            },
        })),
    },
    {
        group: "Advanced blocks",
        items: [
            {
                icon: <TableOfContentsIcon />,
                keywords: ["toc"],
                label: "Table of contents",
                value: TocPlugin.key,
            },
            {
                icon: <Columns3Icon />,
                label: "3 columns",
                value: "action_three_columns",
            },
        ].map((item) => ({
            ...item,
            onSelect: (editor, value) => {
                insertBlock(editor, value);
            },
        })),
    },
];

export function SlashInputElement(
    props: PlateElementProps<TSlashInputElement>
) {
    const { editor, element } = props;

    return (
        <PlateElement {...props} as="span" data-slate-value={element.value}>
            <InlineCombobox element={element} trigger="/">
                <InlineComboboxInput />

                <InlineComboboxContent>
                    <InlineComboboxEmpty>No results</InlineComboboxEmpty>

                    {groups.map(({ group, items }) => (
                        <InlineComboboxGroup key={group}>
                            <InlineComboboxGroupLabel>
                                {group}
                            </InlineComboboxGroupLabel>

                            {items.map(
                                ({
                                    focusEditor,
                                    icon,
                                    keywords,
                                    label,
                                    value,
                                    onSelect,
                                }) => (
                                    <InlineComboboxItem
                                        key={value}
                                        value={value}
                                        onClick={() => onSelect(editor, value)}
                                        label={label}
                                        focusEditor={focusEditor}
                                        group={group}
                                        keywords={keywords}
                                    >
                                        <div className="text-muted-foreground mr-2">
                                            {icon}
                                        </div>
                                        {label ?? value}
                                    </InlineComboboxItem>
                                )
                            )}
                        </InlineComboboxGroup>
                    ))}
                </InlineComboboxContent>
            </InlineCombobox>

            {props.children}
        </PlateElement>
    );
}
