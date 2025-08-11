"use client";

import { useCallback, useRef } from "react";

import { EditorFormHandle } from "@/types/memoir/Memoir";
import { PlateEditor } from "../member/components/CreateMemoir/plate-editor/ui/plate-editor";
import { Value } from "@udecode/plate";
import { useMemoirStore } from "@/store/useMemoirStore";

export default function Test() {
    const editorRef = useRef<EditorFormHandle>(null);
    const setContent = useMemoirStore((s) => s.setContent);

    const handleEditorChange = useCallback(() => {
        const newContent = editorRef.current?.getContent() ?? [];
        setContent(newContent as Value);
    }, [setContent]);

    return (
        <div>
            <PlateEditor />
        </div>
    );
}
