"use client";

import { Plate } from "@udecode/plate/react";

import { EditorFormHandle } from "@/app/member/commits/[sha]/memoir/components/CommitMemoir";
import { Editor, EditorContainer } from "@/plate-editor/ui/editor";
import { forwardRef, memo, useImperativeHandle } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useCreateEditor } from "../../hooks/useCreateEditor";

function PlateEditorInner(_props: unknown, ref: React.Ref<EditorFormHandle>) {
    console.log("PlateEditor 렌더링");
    const editor = useCreateEditor();

    useImperativeHandle(ref, () => ({
        getContent: () => editor.children,
    }));

    return (
        <DndProvider backend={HTML5Backend}>
            <Plate editor={editor}>
                <EditorContainer>
                    {/* 본문 editor */}
                    <div>
                        <label className="block text-sm font-medium">
                            회고록 작성
                        </label>
                        <Editor
                            className="border-border-primary1 h-60 overflow-y-auto rounded-md border px-8 py-2 focus:placeholder:text-transparent"
                            variant="demo"
                            // placeholder="변경 사항에 대한 회고를 작성하세요."
                        />
                    </div>
                </EditorContainer>
            </Plate>
        </DndProvider>
    );
}

export const PlateEditor = memo(
    forwardRef<EditorFormHandle, unknown>(PlateEditorInner)
);

PlateEditor.displayName = "PlateEditor";
