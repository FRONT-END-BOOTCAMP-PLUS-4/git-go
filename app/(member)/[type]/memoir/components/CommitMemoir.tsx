import { CommitType } from "@/types/CommitType";
import { useState } from "react";
import AiSummary from "./AiSummary";
import ChangeList from "./ChangeList";
import CreateMemoirLayout from "./CreateMemoirLayout";
import Editor from "./Editor";
import FileTree from "./FileTree";

export const COMMITS: CommitType[] = [
    {
        sha: "d75b586dac81c39a812d8ca65e4f53171b9ba84d",
        filename: "app/components/Header.tsx",
        status: "added",
        additions: 35,
        deletions: 0,
        changes: 35,
        blob_url:
            "https://github.com/FRONT-END-BOOTCAMP-PLUS-4/git-go/blob/130790fad0f655d5b79bfefb4c140a75b6b97d7f/app%2Fcomponents%2FHeader.tsx",
        raw_url:
            "https://github.com/FRONT-END-BOOTCAMP-PLUS-4/git-go/raw/130790fad0f655d5b79bfefb4c140a75b6b97d7f/app%2Fcomponents%2FHeader.tsx",
        contents_url:
            "https://api.github.com/repos/FRONT-END-BOOTCAMP-PLUS-4/git-go/contents/app%2Fcomponents%2FHeader.tsx?ref=130790fad0f655d5b79bfefb4c140a75b6b97d7f",
        patch:
            "@@ -0,0 +1,35 @@\n" +
            '+import Image from "next/image";\n' +
            '+import React from "react";\n' +
            "+\n" +
            "+export default function Header() {\n" +
            "+    return (\n" +
            '+        <div className="border-border-primary1 flex h-[65px] flex-row items-center justify-between border-b px-24">\n' +
            '+            <div className="flex items-center justify-center">\n' +
            "+                <Image\n" +
            '+                    className="mr-3"\n' +
            '+                    src="/logo.svg"\n' +
            '+                    alt="logo"\n' +
            "+                    width={45}\n" +
            "+                    height={45}\n" +
            "+                />\n" +
            '+                <div className="font-semibold">GITGO</div>\n' +
            "+            </div>\n" +
            '+            <div className="flex items-center justify-center">\n' +
            "+                <Image\n" +
            '+                    src="/dummy-profile.svg"\n' +
            '+                    alt="user profile"\n' +
            "+                    width={30}\n" +
            "+                    height={30}\n" +
            "+                />\n" +
            '+                <div className="ml-4">John Doe</div>\n' +
            "+                <Image\n" +
            '+                    className="ml-4"\n' +
            '+                    src="/down-arrow.svg"\n' +
            '+                    alt="down arrow"\n' +
            "+                    width={13}\n" +
            "+                    height={13}\n" +
            "+                />\n" +
            "+            </div>\n" +
            "+        </div>\n" +
            "+    );\n" +
            "+}",
    },
    {
        sha: "9df5bb758a27b5017a152277a00c9564de8bcb97",
        filename: "app/layout.tsx",
        status: "modified",
        additions: 2,
        deletions: 4,
        changes: 6,
        blob_url:
            "https://github.com/FRONT-END-BOOTCAMP-PLUS-4/git-go/blob/130790fad0f655d5b79bfefb4c140a75b6b97d7f/app%2Flayout.tsx",
        raw_url:
            "https://github.com/FRONT-END-BOOTCAMP-PLUS-4/git-go/raw/130790fad0f655d5b79bfefb4c140a75b6b97d7f/app%2Flayout.tsx",
        contents_url:
            "https://api.github.com/repos/FRONT-END-BOOTCAMP-PLUS-4/git-go/contents/app%2Flayout.tsx?ref=130790fad0f655d5b79bfefb4c140a75b6b97d7f",
        patch:
            "@@ -1,3 +1,4 @@\n" +
            '+import Header from "./components/Header";\n' +
            ' import "./globals.css";\n' +
            " \n" +
            ' import Link from "next/link";\n' +
            "@@ -10,10 +11,7 @@ export default function RootLayout({\n" +
            "     return (\n" +
            '         <html lang="en">\n' +
            '             <body className="bg-bg-primary1">\n' +
            '-                <nav className="flex justify-between items-center bg-white">\n' +
            '-                    <Link href={"/"}>로고</Link>\n' +
            '-                    <button>로그인 버튼</button>{" "}\n' +
            "-                </nav>\n" +
            "+                <Header />\n" +
            "                 {children}\n" +
            "             </body>\n" +
            "         </html>",
    },
];

export default function CommitMemoir() {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    // console.log("selectedFile: ", selectedFile);

    return (
        <CreateMemoirLayout>
            <FileTree commits={COMMITS} onSelect={setSelectedFile} />
            <div className="flex-4 overflow-y-auto p-4">
                <ChangeList commits={COMMITS} selectedFile={selectedFile} />
            </div>
            <div className="flex flex-3 flex-col justify-between gap-4 p-4">
                <Editor />
                <AiSummary />
                <div className="flex justify-end gap-2">
                    <button className="border-border-primary1 rounded-md border px-4 py-2">
                        취소
                    </button>
                    <button className="bg-primary7 text-text-primary1 rounded-md px-4 py-2">
                        회고록 작성 완료
                    </button>
                </div>
            </div>
        </CreateMemoirLayout>
    );
}
