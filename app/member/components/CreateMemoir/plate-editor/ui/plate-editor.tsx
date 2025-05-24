"use client";

import { Plate } from "@udecode/plate/react";

import {
    Editor,
    EditorContainer,
} from "@/app/member/components/CreateMemoir/plate-editor/ui/editor";
import { useCreateEditor } from "@/hooks/useCreateEditor";
import { EditorFormHandle } from "@/types/memoir/Memoir";
import { Value } from "@udecode/plate";
import { forwardRef, memo, useImperativeHandle } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type PlateEditorProps = {
    readOnly?: boolean;
    handleEditorChange?: () => void;
    initialContent?: Value;
};

function PlateEditorInner(
    { readOnly, handleEditorChange, initialContent }: PlateEditorProps,
    ref: React.Ref<EditorFormHandle>
) {
    const editor = useCreateEditor({ readOnly, value: initialContent });

    useImperativeHandle(ref, () => ({
        getContent: () => editor.children,
    }));

    console.log("plate-editor 렌더링");

    return (
        <DndProvider backend={HTML5Backend}>
            <Plate
                editor={editor}
                onChange={handleEditorChange}
                readOnly={readOnly}
            >
                <EditorContainer className="flex flex-1 flex-col bg-green-300">
                    {/* 본문 editor */}
                    <div className="flex flex-1 flex-col gap-1">
                        <label className="block text-sm font-medium">
                            회고록 작성
                        </label>
                        <Editor
                            className="border-border-primary1 min-h-0 flex-1 overflow-y-auto rounded-md border bg-amber-300 px-8 py-2 focus:placeholder:text-transparent"
                            variant="demo"
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
