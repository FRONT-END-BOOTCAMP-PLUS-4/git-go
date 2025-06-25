import { CodeXml, File, PenTool } from "lucide-react";

export const NAVIGATION_ITEMS = [
    {
        icon: <File />,
        tabName: "file",
        text: "파일 변경 내역",
    },
    {
        icon: <CodeXml />,
        tabName: "codeChange",

        text: "코드 변경 내역",
    },
    {
        icon: <PenTool />,
        tabName: "memoir",
        text: "회고",
    },
];
