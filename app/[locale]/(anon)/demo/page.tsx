"use client";

import { DEMO_COMMIT } from "@/constants/demo";
import { useMemo, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import AccordionSidebar from "../../member/components/CreateMemoir/AccordionSideBar";
import ChangeList from "../../member/components/CreateMemoir/ChangeList";
import ChangeListLayout from "../../member/components/CreateMemoir/ChangeListLayout";
import CreateMemoirLayout from "../../member/components/CreateMemoir/CreateMemoirLayout";
import DemoEditorForm from "../../member/components/CreateMemoir/DemoEditorForm";

export default function Demo() {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const files = useMemo(
        () => DEMO_COMMIT.changeDetail.map((c) => c.filename),
        []
    );

    return (
        <CreateMemoirLayout>
            <PanelGroup direction="horizontal" className="h-full w-full">
                <AccordionSidebar
                    files={files}
                    selectedFile={selectedFile}
                    onSelect={setSelectedFile}
                />
                <Panel defaultSize={40} minSize={20}>
                    <ChangeListLayout>
                        <div className="shadow-primary mb-2 truncate px-3 py-2 font-semibold">
                            {DEMO_COMMIT.message}
                        </div>
                        <ChangeList
                            changes={DEMO_COMMIT.changeDetail}
                            selectedFile={selectedFile}
                        />
                    </ChangeListLayout>
                </Panel>
                <PanelResizeHandle className="bg-bg-primary2 hover:bg-text-gray1 w-1 cursor-col-resize" />
                <Panel defaultSize={40} minSize={20}>
                    <div className="bg-bg-member1 flex h-full flex-col justify-between gap-4 p-4">
                        <DemoEditorForm />
                    </div>
                </Panel>
            </PanelGroup>
        </CreateMemoirLayout>
    );
}
