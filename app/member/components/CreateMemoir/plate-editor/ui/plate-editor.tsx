"use client";

import { Plate } from "@udecode/plate/react";

import {
    Editor,
    EditorContainer,
} from "@/app/member/components/CreateMemoir/plate-editor/ui/editor";
import { useCreateEditor } from "@/hooks/useCreateEditor";
import { EditorFormHandle } from "@/types/github/ShareType";
import { Value } from "@udecode/plate";
import { forwardRef, memo, useImperativeHandle } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type PlateEditorProps = {
    readOnly?: boolean;
    initialContent: Value;
};

function PlateEditorInner(
    { readOnly, initialContent }: PlateEditorProps,
    ref: React.Ref<EditorFormHandle>
) {
    const editor = useCreateEditor({ readOnly, value: initialContent }, [
        initialContent,
    ]);

    useImperativeHandle(ref, () => ({
        getContent: () => editor.children,
    }));

    return (
        <DndProvider backend={HTML5Backend}>
            <Plate editor={editor} readOnly={readOnly}>
                <EditorContainer className="flex flex-1 flex-col">
                    {/* 본문 editor */}
                    <div className="flex flex-1 flex-col gap-1">
                        <label className="block text-sm font-medium">
                            회고록 작성
                        </label>
                        <Editor
                            className="border-border-primary1 min-h-60 flex-1 overflow-y-auto rounded-md border px-8 py-2 focus:placeholder:text-transparent"
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
    forwardRef<EditorFormHandle, PlateEditorProps>(PlateEditorInner)
);

PlateEditor.displayName = "PlateEditor";
