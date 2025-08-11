"use client";

import {
    Editor,
    EditorContainer,
} from "@/app/member/components/CreateMemoir/plate-editor/ui/editor";
import React, { ReactNode, forwardRef, memo, useImperativeHandle } from "react";

import { DndProvider } from "react-dnd";
import { EditorFormHandle } from "@/types/memoir/Memoir";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Plate } from "@udecode/plate/react";
import { Value } from "@udecode/plate";
import { useCreateEditor } from "@/hooks/useCreateEditor";

type PlateEditorProps = {
    readOnly?: boolean;
    handleEditorChange?: () => void;
    initialContent?: Value;
    toolbar?: ReactNode;
    className?: string;
};

function PlateEditorInner(
    {
        readOnly,
        handleEditorChange,
        initialContent,
        toolbar,
        className,
    }: PlateEditorProps,
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
                <EditorContainer
                    className={`border-border-primary1 flex flex-1 flex-col rounded-md border ${className}`}
                >
                    <div className="flex items-center justify-end">
                        {toolbar && (
                            <div className="mb-2 flex items-center gap-2">
                                <div>회고록 내보내기</div>
                                <div>{toolbar}</div>
                            </div>
                        )}
                    </div>

                    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
                        <Editor className="flex-1 px-5 py-2" variant="demo" />
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
