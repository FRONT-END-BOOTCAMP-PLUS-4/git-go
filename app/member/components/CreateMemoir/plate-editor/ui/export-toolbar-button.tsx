"use client";

import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";

import { withProps } from "@udecode/cn";
import {
    BaseParagraphPlugin,
    createSlateEditor,
    serializeHtml,
    SlateLeaf,
} from "@udecode/plate";
import { BaseAlignPlugin } from "@udecode/plate-alignment";
import {
    BaseBoldPlugin,
    BaseCodePlugin,
    BaseItalicPlugin,
    BaseStrikethroughPlugin,
    BaseSubscriptPlugin,
    BaseSuperscriptPlugin,
    BaseUnderlinePlugin,
} from "@udecode/plate-basic-marks";
import { BaseBlockquotePlugin } from "@udecode/plate-block-quote";
import {
    BaseCodeBlockPlugin,
    BaseCodeLinePlugin,
    BaseCodeSyntaxPlugin,
} from "@udecode/plate-code-block";
import { BaseCommentsPlugin } from "@udecode/plate-comments";
import { BaseDatePlugin } from "@udecode/plate-date";
import {
    BaseFontBackgroundColorPlugin,
    BaseFontColorPlugin,
    BaseFontSizePlugin,
} from "@udecode/plate-font";
import {
    BaseHeadingPlugin,
    BaseTocPlugin,
    HEADING_KEYS,
    HEADING_LEVELS,
} from "@udecode/plate-heading";
import { BaseHighlightPlugin } from "@udecode/plate-highlight";
import { BaseHorizontalRulePlugin } from "@udecode/plate-horizontal-rule";
import { BaseIndentPlugin } from "@udecode/plate-indent";
import { BaseIndentListPlugin } from "@udecode/plate-indent-list";
import { BaseKbdPlugin } from "@udecode/plate-kbd";
import { BaseColumnItemPlugin, BaseColumnPlugin } from "@udecode/plate-layout";
import { BaseLineHeightPlugin } from "@udecode/plate-line-height";
import { BaseLinkPlugin } from "@udecode/plate-link";
import { MarkdownPlugin } from "@udecode/plate-markdown";
import {
    BaseEquationPlugin,
    BaseInlineEquationPlugin,
} from "@udecode/plate-math";
import {
    BaseAudioPlugin,
    BaseFilePlugin,
    BaseImagePlugin,
    BaseMediaEmbedPlugin,
    BaseVideoPlugin,
} from "@udecode/plate-media";
import { BaseMentionPlugin } from "@udecode/plate-mention";
import {
    BaseTableCellHeaderPlugin,
    BaseTableCellPlugin,
    BaseTablePlugin,
    BaseTableRowPlugin,
} from "@udecode/plate-table";
import { BaseTogglePlugin } from "@udecode/plate-toggle";
import { useEditorRef } from "@udecode/plate/react";
import { all, createLowlight } from "lowlight";
import { ArrowDownToLineIcon } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/app/member/components/CreateMemoir/plate-editor/ui/dropdown-menu";

import { LinkElementStatic } from "@/app/member/components/CreateMemoir/plate-editor/ui/link-element-static";

import { useEffect, useState } from "react";
import { BlockquoteElementStatic } from "./blockquote-element-static";
import { CodeBlockElementStatic } from "./code-block-element-static";
import { CodeLeafStatic } from "./code-leaf-static";
import { CodeLineElementStatic } from "./code-line-element-static";
import { CodeSyntaxLeafStatic } from "./code-syntax-leaf-static";
import { ColumnElementStatic } from "./column-element-static";
import { ColumnGroupElementStatic } from "./column-group-element-static";
import { EditorStatic } from "./editor-static";
import { HeadingElementStatic } from "./heading-element-static";
import { HighlightLeafStatic } from "./highlight-leaf-static";
import { HrElementStatic } from "./hr-element-static";
import { FireLiComponent, FireMarker } from "./indent-fire-marker";
import { TodoLiStatic, TodoMarkerStatic } from "./indent-todo-marker-static";
import { ParagraphElementStatic } from "./paragraph-element-static";
import {
    TableCellElementStatic,
    TableCellHeaderStaticElement,
} from "./table-cell-element-static";
import { TableElementStatic } from "./table-element-static";
import { TableRowElementStatic } from "./table-row-element-static";
import { TocElementStatic } from "./toc-element-static";
import { ToggleElementStatic } from "./toggle-element-static";
import { ToolbarButton } from "./toolbar";

const siteUrl = "https://platejs.org";
const lowlight = createLowlight(all);

export function ExportToolbarButton(
    props: DropdownMenuProps & { title?: string }
) {
    const editor = useEditorRef();
    const [open, setOpen] = useState(false);

    const [bgColor, setBgColor] = useState<string>("#fff");

    // 마운트 후에 한 번만 읽어서 상태에 저장
    useEffect(() => {
        const saved = localStorage.getItem("theme");
        setBgColor(saved === "dark" ? "#000" : "#fff");
    }, []);

    const getCanvas = async () => {
        const { default: html2canvas } = await import("html2canvas-pro");
        const orig = editor.api.toDOMNode(editor)!;

        // 1) 오프스크린에 복제본 생성
        const clone = orig.cloneNode(true) as HTMLElement;

        // Pretendard 변수 클래스 추가
        clone.classList.add("__font-pretendard");
        clone.style.position = "absolute";
        /* …생략… */
        document.body.append(clone);

        clone.style.position = "absolute";
        clone.style.top = "-9999px";
        clone.style.left = "0";
        clone.style.width = `${orig.scrollWidth}px`;
        clone.style.height = `${orig.scrollHeight}px`;
        clone.style.overflow = "visible";
        document.body.append(clone);

        // 2) 캡처
        const canvas = await html2canvas(clone, {
            width: clone.scrollWidth,
            height: clone.scrollHeight,
            scrollX: 0,
            scrollY: 0,
            backgroundColor: bgColor,
            onclone: (doc) => {
                // 1) Pretendard @font-face 정의 삽입
                const style = doc.createElement("style");
                style.textContent = `
        @font-face {
          font-family: 'Pretendard';
          font-display: swap;
          src: url('PretendardVariable.woff2') format('woff2');
          font-weight: 100 900;
        }
        .__font-pretendard { font-family: 'Pretendard'; }
      `;
                doc.head.append(style);

                // 2) 기존 폰트 강제 주입 로직
                const editorNode = doc.querySelector(
                    '[contenteditable="true"]'
                );
                if (editorNode) {
                    Array.from(editorNode.querySelectorAll("*")).forEach(
                        (el) => {
                            const ex = el.getAttribute("style") || "";
                            el.setAttribute(
                                "style",
                                `${ex}; font-family: Pretendard !important;`
                            );
                        }
                    );
                }
            },
        });

        clone.remove();
        return canvas;
    };

    const downloadFile = async (url: string, filename: string) => {
        const response = await fetch(url);

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        document.body.append(link);
        link.click();
        link.remove();

        // Clean up the blob URL
        window.URL.revokeObjectURL(blobUrl);
    };

    const exportToPdf = async () => {
        const canvas = await getCanvas();

        const PDFLib = await import("pdf-lib");
        const pdfDoc = await PDFLib.PDFDocument.create();
        const page = pdfDoc.addPage([canvas.width, canvas.height]);
        const imageEmbed = await pdfDoc.embedPng(canvas.toDataURL("PNG"));
        const { height, width } = imageEmbed.scale(1);
        page.drawImage(imageEmbed, {
            height,
            width,
            x: 0,
            y: 0,
        });
        const pdfBase64 = await pdfDoc.saveAsBase64({ dataUri: true });

        await downloadFile(pdfBase64, `${props.title}.pdf`);
    };

    const exportToImage = async () => {
        const canvas = await getCanvas();
        await downloadFile(canvas.toDataURL("image/png"), `${props.title}.png`);
    };

    const exportToHtml = async () => {
        const components = {
            // [BaseAudioPlugin.key]: MediaAudioElementStatic,
            [BaseBlockquotePlugin.key]: BlockquoteElementStatic,
            [BaseBoldPlugin.key]: withProps(SlateLeaf, { as: "strong" }),
            [BaseCodeBlockPlugin.key]: CodeBlockElementStatic,
            [BaseCodeLinePlugin.key]: CodeLineElementStatic,
            [BaseCodePlugin.key]: CodeLeafStatic,
            [BaseCodeSyntaxPlugin.key]: CodeSyntaxLeafStatic,
            [BaseColumnItemPlugin.key]: ColumnElementStatic,
            [BaseColumnPlugin.key]: ColumnGroupElementStatic,
            [BaseHighlightPlugin.key]: HighlightLeafStatic,
            [BaseHorizontalRulePlugin.key]: HrElementStatic,
            // [BaseImagePlugin.key]: ImageElementStatic,
            [BaseItalicPlugin.key]: withProps(SlateLeaf, { as: "em" }),
            // [BaseKbdPlugin.key]: KbdLeafStatic,
            [BaseLinkPlugin.key]: LinkElementStatic,
            // [BaseMediaEmbedPlugin.key]: MediaEmbedElementStatic,
            [BaseParagraphPlugin.key]: ParagraphElementStatic,
            [BaseStrikethroughPlugin.key]: withProps(SlateLeaf, { as: "del" }),
            [BaseSubscriptPlugin.key]: withProps(SlateLeaf, { as: "sub" }),
            [BaseSuperscriptPlugin.key]: withProps(SlateLeaf, { as: "sup" }),
            [BaseTableCellHeaderPlugin.key]: TableCellHeaderStaticElement,
            [BaseTableCellPlugin.key]: TableCellElementStatic,
            [BaseTablePlugin.key]: TableElementStatic,
            [BaseTableRowPlugin.key]: TableRowElementStatic,
            [BaseTocPlugin.key]: TocElementStatic,
            [BaseTogglePlugin.key]: ToggleElementStatic,
            [BaseUnderlinePlugin.key]: withProps(SlateLeaf, { as: "u" }),
            // [BaseVideoPlugin.key]: MediaVideoElementStatic,
            [HEADING_KEYS.h1]: withProps(HeadingElementStatic, {
                variant: "h1",
            }),
            [HEADING_KEYS.h2]: withProps(HeadingElementStatic, {
                variant: "h2",
            }),
            [HEADING_KEYS.h3]: withProps(HeadingElementStatic, {
                variant: "h3",
            }),
            [HEADING_KEYS.h4]: withProps(HeadingElementStatic, {
                variant: "h4",
            }),
            [HEADING_KEYS.h5]: withProps(HeadingElementStatic, {
                variant: "h5",
            }),
            [HEADING_KEYS.h6]: withProps(HeadingElementStatic, {
                variant: "h6",
            }),
        };

        const editorStatic = createSlateEditor({
            plugins: [
                BaseColumnPlugin,
                BaseColumnItemPlugin,
                BaseTocPlugin,
                BaseVideoPlugin,
                BaseAudioPlugin,
                BaseParagraphPlugin,
                BaseHeadingPlugin,
                BaseMediaEmbedPlugin,
                BaseBoldPlugin,
                BaseCodePlugin,
                BaseItalicPlugin,
                BaseStrikethroughPlugin,
                BaseSubscriptPlugin,
                BaseSuperscriptPlugin,
                BaseUnderlinePlugin,
                BaseBlockquotePlugin,
                BaseDatePlugin,
                BaseEquationPlugin,
                BaseInlineEquationPlugin,
                BaseCodeBlockPlugin.configure({
                    options: {
                        lowlight,
                    },
                }),
                BaseIndentPlugin.extend({
                    inject: {
                        targetPlugins: [
                            BaseParagraphPlugin.key,
                            BaseBlockquotePlugin.key,
                            BaseCodeBlockPlugin.key,
                        ],
                    },
                }),
                BaseIndentListPlugin.extend({
                    inject: {
                        targetPlugins: [
                            BaseParagraphPlugin.key,
                            ...HEADING_LEVELS,
                            BaseBlockquotePlugin.key,
                            BaseCodeBlockPlugin.key,
                            BaseTogglePlugin.key,
                        ],
                    },
                    options: {
                        listStyleTypes: {
                            fire: {
                                liComponent: FireLiComponent,
                                markerComponent: FireMarker,
                                type: "fire",
                            },
                            todo: {
                                liComponent: TodoLiStatic,
                                markerComponent: TodoMarkerStatic,
                                type: "todo",
                            },
                        },
                    },
                }),
                BaseLinkPlugin,
                BaseTableRowPlugin,
                BaseTablePlugin,
                BaseTableCellPlugin,
                BaseHorizontalRulePlugin,
                BaseFontColorPlugin,
                BaseFontBackgroundColorPlugin,
                BaseFontSizePlugin,
                BaseKbdPlugin,
                BaseAlignPlugin.extend({
                    inject: {
                        targetPlugins: [
                            BaseParagraphPlugin.key,
                            BaseMediaEmbedPlugin.key,
                            ...HEADING_LEVELS,
                            BaseImagePlugin.key,
                        ],
                    },
                }),
                BaseLineHeightPlugin,
                BaseHighlightPlugin,
                BaseFilePlugin,
                BaseImagePlugin,
                BaseMentionPlugin,
                BaseCommentsPlugin,
                BaseTogglePlugin,
            ],
            value: editor.children,
        });

        const editorHtml = await serializeHtml(editorStatic, {
            components,
            editorComponent: EditorStatic,
            props: {
                style: { padding: "0 calc(50% - 350px)", paddingBottom: "" },
            },
        });

        const tailwindCss = `<link rel="stylesheet" href="${siteUrl}/tailwind.css">`;
        const katexCss = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.18/dist/katex.css" integrity="sha384-9PvLvaiSKCPkFKB1ZsEoTjgnJn+O3KvEwtsz37/XrkYft3DTk2gHdYvd9oWgW3tV" crossorigin="anonymous">`;

        const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&family=JetBrains+Mono:wght@400..700&display=swap"
          rel="stylesheet"
        />
        ${tailwindCss}
        ${katexCss}
        <style>
            @font-face {
                font-family: 'Pretendard';
                font-display: swap;
                src: url('PretendardVariable.woff2') format('woff2');
                font-weight: 100 900;
        }
        body { font-family: 'Pretendard', sans-serif; }
  </style>
      </head>
      <body>
        ${editorHtml}
      </body>
    </html>`;

        const url = `data:text/html;charset=utf-8,${encodeURIComponent(html)}`;

        await downloadFile(url, `${props.title}.html`);
    };

    const exportToMarkdown = async () => {
        const md = editor.getApi(MarkdownPlugin).markdown.serialize();
        const url = `data:text/markdown;charset=utf-8,${encodeURIComponent(md)}`;
        await downloadFile(url, `${props.title}.md`);
    };

    return (
        <DropdownMenu
            open={open}
            onOpenChange={setOpen}
            modal={false}
            {...props}
        >
            <DropdownMenuTrigger asChild>
                <ToolbarButton pressed={open} tooltip="Export" isDropdown>
                    <ArrowDownToLineIcon className="size-4" />
                </ToolbarButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={exportToHtml}>
                        Export as HTML
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={exportToPdf}>
                        Export as PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={exportToImage}>
                        Export as Image
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={exportToMarkdown}>
                        Export as Markdown
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
