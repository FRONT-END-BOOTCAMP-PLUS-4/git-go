"use client";

import { Plate } from "@udecode/plate/react";

import {
    Editor,
    EditorContainer,
} from "@/app/member/components/CreateMemoir/plate-editor/ui/editor";
import { useCreateEditor } from "@/hooks/useCreateEditor";
import { EditorFormHandle } from "@/types/memoir/Memoir";
import { Value } from "@udecode/plate";
import React, { forwardRef, memo, ReactNode, useImperativeHandle } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type PlateEditorProps = {
    readOnly?: boolean;
    handleEditorChange?: () => void;
    initialContent?: Value;
    toolbar?: ReactNode;
};

function PlateEditorInner(
    { readOnly, handleEditorChange, initialContent, toolbar }: PlateEditorProps,
    ref: React.Ref<EditorFormHandle>
) {
    const editor = useCreateEditor({ readOnly, value: initialContent });

    useImperativeHandle(ref, () => ({
        getContent: () => editor.children,
    }));

    return (
        <DndProvider backend={HTML5Backend}>
            <Plate
                editor={editor}
                onChange={handleEditorChange}
                readOnly={readOnly}
            >
                <EditorContainer className="flex flex-1 flex-col">
                    <div className="flex items-center justify-between gap-2">
                        {toolbar && <div className="mb-2">{toolbar}</div>}
                    </div>

                    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
                        <Editor
                            className="border-border-primary1 flex-1 rounded-md border border-b-[2px] px-5 py-2"
                            variant="demo"
                        />
                    </div>
                </EditorContainer>
            </Plate>
        </DndProvider>
    );
}

// React.memo와 forwardRef를 사용하여 컴포넌트 최적화
export const PlateEditor = memo(
    forwardRef<EditorFormHandle, PlateEditorProps>(PlateEditorInner)
);

PlateEditor.displayName = "PlateEditor";
