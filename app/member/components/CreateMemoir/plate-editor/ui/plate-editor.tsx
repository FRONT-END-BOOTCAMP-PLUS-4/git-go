"use client";

import { Plate } from "@udecode/plate/react";

import {
    Editor,
    EditorContainer,
} from "@/app/member/components/CreateMemoir/plate-editor/ui/editor";
import { useCreateEditor } from "@/hooks/useCreateEditor";
import { EditorFormHandle } from "@/types/github/ShareType";
import { forwardRef, memo, useImperativeHandle } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type PlateEditorProps = {
    readOnly?: boolean;
    initialContent: any[];
};

function PlateEditorInner(
    _props: PlateEditorProps,
    ref: React.Ref<EditorFormHandle>
) {
    console.log("PlateEditor 렌더링");
    const { readOnly, initialContent } = _props;

    const editor = useCreateEditor({
        readOnly,
        value: initialContent,
    });

    useImperativeHandle(ref, () => ({
        getContent: () => editor.children,
    }));

    return (
        <DndProvider backend={HTML5Backend}>
            <Plate editor={editor} readOnly={readOnly}>
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
    forwardRef<EditorFormHandle, PlateEditorProps>(PlateEditorInner)
);

PlateEditor.displayName = "PlateEditor";
