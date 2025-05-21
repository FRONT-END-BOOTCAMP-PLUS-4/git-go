"use client";

import Button from "@/app/components/Button";
import AiSummary from "@/app/member/components/CreateMemoir/AiSummary";
import ChangeList from "@/app/member/components/CreateMemoir/ChangeList";
import ChangeListLayout from "@/app/member/components/CreateMemoir/ChangeListLayout";
import CreateMemoirLayout from "@/app/member/components/CreateMemoir/CreateMemoirLayout";
import EditorForm from "@/app/member/components/CreateMemoir/EditorForm";
import FileTree from "@/app/member/components/CreateMemoir/FileTree";
import { useMemoirForm } from "@/hooks/useMemoirForm";
import { CommitType } from "@/types/github/CommitType";
import { useParams } from "next/navigation";
import { useState } from "react";

export const COMMITS: CommitType = {
    sha: "abcdef1234567890abcdef1234567890abcdef12",
    node_id: "MDY6Q29tbWl0YWJjZGVmMTIzNDU2Nzg5MGE=",
    commit: {
        author: {
            name: "johndoe",
            email: "johndoe@example.com",
            date: "2025-05-15T10:00:00Z",
        },
        committer: {
            name: "johndoe",
            email: "johndoe@example.com",
            date: "2025-05-15T10:00:00Z",
        },
        message: "feat: 회원가입 유효성 검사 추가",
        tree: {
            sha: "1234abcd5678efgh1234abcd5678efgh1234abcd",
            url: "https://api.github.com/repos/OWNER/REPO/git/trees/1234abcd5678efgh1234abcd5678efgh1234abcd",
        },
        url: "https://api.github.com/repos/OWNER/REPO/git/commits/abcdef1234567890abcdef1234567890abcdef12",
        comment_count: 0,
        verification: {
            verified: false,
            reason: "unsigned",
            signature: null,
            payload: null,
            verified_at: null,
        },
    },
    url: "https://api.github.com/repos/OWNER/REPO/commits/abcdef1234567890abcdef1234567890abcdef12",
    html_url:
        "https://github.com/OWNER/REPO/commit/abcdef1234567890abcdef1234567890abcdef12",
    comments_url:
        "https://api.github.com/repos/OWNER/REPO/commits/abcdef1234567890abcdef1234567890abcdef12/comments",
    author: {
        login: "johndoe",
        id: 123,
        node_id: "MDQ6VXNlcjEyMw==",
        avatar_url: "https://avatars.githubusercontent.com/u/123?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/johndoe",
        html_url: "https://github.com/johndoe",
        followers_url: "https://api.github.com/users/johndoe/followers",
        following_url:
            "https://api.github.com/users/johndoe/following{/other_user}",
        gists_url: "https://api.github.com/users/johndoe/gists{/gist_id}",
        starred_url:
            "https://api.github.com/users/johndoe/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/johndoe/subscriptions",
        organizations_url: "https://api.github.com/users/johndoe/orgs",
        repos_url: "https://api.github.com/users/johndoe/repos",
        events_url: "https://api.github.com/users/johndoe/events{/privacy}",
        received_events_url:
            "https://api.github.com/users/johndoe/received_events",
        type: "User",
        site_admin: false,
    },
    committer: {
        login: "johndoe",
        id: 123,
        node_id: "MDQ6VXNlcjEyMw==",
        avatar_url: "https://avatars.githubusercontent.com/u/123?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/johndoe",
        html_url: "https://github.com/johndoe",
        followers_url: "https://api.github.com/users/johndoe/followers",
        following_url:
            "https://api.github.com/users/johndoe/following{/other_user}",
        gists_url: "https://api.github.com/users/johndoe/gists{/gist_id}",
        starred_url:
            "https://api.github.com/users/johndoe/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/johndoe/subscriptions",
        organizations_url: "https://api.github.com/users/johndoe/orgs",
        repos_url: "https://api.github.com/users/johndoe/repos",
        events_url: "https://api.github.com/users/johndoe/events{/privacy}",
        received_events_url:
            "https://api.github.com/users/johndoe/received_events",
        type: "User",
        site_admin: false,
    },
    parents: [
        {
            sha: "fedcba0987654321fedcba0987654321fedcba09",
            url: "https://api.github.com/repos/OWNER/REPO/commits/fedcba0987654321fedcba0987654321fedcba09",
            html_url:
                "https://github.com/OWNER/REPO/commit/fedcba0987654321fedcba0987654321fedcba09",
        },
    ],
    files: [
        {
            sha: "abc123abc123abc123abc123abc123abc123abc1",
            filename: "src/components/SignUpForm.tsx",
            status: "modified",
            additions: 10,
            deletions: 2,
            changes: 12,
            blob_url:
                "https://github.com/OWNER/REPO/blob/abcdef.../SignUpForm.tsx",
            raw_url:
                "https://github.com/OWNER/REPO/raw/abcdef.../SignUpForm.tsx",
            contents_url:
                "https://api.github.com/repos/OWNER/REPO/contents/.../SignUpForm.tsx",
            patch:
                "@@ -15,7 +15,15 @@ function SignUpForm() {\n" +
                "-  const [username, setUsername] = useState('');\n" +
                "+  const [username, setUsername] = useState(''); // 최대 길이 검사 추가\n" +
                "+  const [usernameError, setUsernameError] = useState('');\n" +
                "+  // 추가 필드 검증 로직\n" +
                "+  if (username.length < 3) {\n" +
                "+    setUsernameError('3자 이상 입력하세요');\n" +
                "+  }\n" +
                "+  // …\n" +
                "+  return (\n" +
                "+    <form>…</form>\n" +
                "  );\n",
        },
        {
            sha: "def456def456def456def456def456def456def4",
            filename: "src/utils/validation.ts",
            status: "added",
            additions: 30,
            deletions: 0,
            changes: 30,
            blob_url:
                "https://github.com/OWNER/REPO/blob/abcdef.../validation.ts",
            raw_url:
                "https://github.com/OWNER/REPO/raw/abcdef.../validation.ts",
            contents_url:
                "https://api.github.com/repos/OWNER/REPO/contents/.../validation.ts",
            patch:
                "@@ -0,0 +1,30 @@\n" +
                "+export function validateUsername(name: string) {\n" +
                "+  if (name.length < 3) {\n" +
                "+    throw new Error('사용자 이름은 3자 이상이어야 합니다.');\n" +
                "+  }\n" +
                "+  // 추가 검증 로직 예: 특수문자 체크\n" +
                "+  const regex = /^[a-zA-Z0-9]+$/;\n" +
                "+  if (!regex.test(name)) {\n" +
                "+    throw new Error('영문/숫자만 가능합니다.');\n" +
                "+  }\n" +
                "+}\n" +
                "+// …\n",
        },
    ],
};

export default function CommitMemoir() {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const { sha }: { sha: string } = useParams();
    const {
        title,
        setTitle,
        tags,
        setTags,
        editorRef,
        disabled,
        loading,
        error,
        handleSave,
    } = useMemoirForm(sha, 1);

    return (
        <CreateMemoirLayout>
            <FileTree files={COMMITS.files} onSelect={setSelectedFile} />
            <div className="grid grid-cols-2">
                <ChangeListLayout>
                    <div className="px-3 py-2 font-semibold">
                        {COMMITS.commit.message}
                    </div>
                    <ChangeList
                        changes={COMMITS.files}
                        selectedFile={selectedFile}
                    />
                </ChangeListLayout>

                <div className="col-span-1 flex flex-col justify-between gap-4 p-4">
                    <EditorForm
                        title={title}
                        onTitleChange={setTitle}
                        tags={tags}
                        onTagsChange={setTags}
                        ref={editorRef}
                    />

                    <AiSummary />

                    <div className="flex justify-end gap-2">
                        <Button type="lined">취소</Button>
                        <Button
                            onClick={handleSave}
                            type={disabled ? "disabled" : "default"}
                            isLoading={loading}
                        >
                            {loading ? "저장 중…" : "회고록 작성 완료"}
                        </Button>
                    </div>
                </div>
            </div>
        </CreateMemoirLayout>
    );
}
