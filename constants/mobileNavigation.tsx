import { CodeXml, File, Pencil } from "lucide-react";

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
        icon: <Pencil />,
        tabName: "memoir",
        text: "회고",
    },
];
