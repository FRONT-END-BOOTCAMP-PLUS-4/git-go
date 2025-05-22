"use client";

import AccordionSidebar from "@/app/member/components/CreateMemoir/AccordionSideBar";
import ChangeList from "@/app/member/components/CreateMemoir/ChangeList";
import ChangeListLayout from "@/app/member/components/CreateMemoir/ChangeListLayout";
import CreateMemoirLayout from "@/app/member/components/CreateMemoir/CreateMemoirLayout";
import EditorForm from "@/app/member/components/CreateMemoir/EditorForm";
import Select from "@/app/member/components/Select";
import { COMMITS } from "@/constants/mockCommits";
import useExtractFilenames from "@/hooks/useExtractFileNames";
import { CommitType } from "@/types/github/CommitType";
import { PullRequestType } from "@/types/github/PullRequestType";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Option = {
    value: string;
    label: string;
};

export const MOCK_PR: PullRequestType[] = [
    {
        sha: "1111111111111111111111111111111111111111",
        node_id: "MDY6Q29tbWl0MTExMTExMTExMTExMTExMQ==",
        commit: {
            author: {
                name: "alice",
                email: "alice@example.com",
                date: "2025-05-14T08:00:00Z",
            },
            committer: {
                name: "alice",
                email: "alice@example.com",
                date: "2025-05-14T08:00:00Z",
            },
            message: "feat: 로그인 페이지 구현",
            tree: {
                sha: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                url: "https://api.github.com/repos/OWNER/REPO/git/trees/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            },
            url: "https://api.github.com/repos/OWNER/REPO/git/commits/1111111111111111111111111111111111111111",
            comment_count: 0,
            verification: {
                verified: false,
                reason: "unsigned",
                signature: null,
                payload: null,
                verified_at: null,
            },
        },
        url: "https://api.github.com/repos/OWNER/REPO/commits/1111111111111111111111111111111111111111",
        html_url:
            "https://github.com/OWNER/REPO/commit/1111111111111111111111111111111111111111",
        comments_url:
            "https://api.github.com/repos/OWNER/REPO/commits/1111111111111111111111111111111111111111/comments",
        author: {
            login: "alice",
            id: 101,
            node_id: "MDQ6VXNlcjEwMQ==",
            avatar_url: "https://avatars.githubusercontent.com/u/101?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/alice",
            html_url: "https://github.com/alice",
            followers_url: "https://api.github.com/users/alice/followers",
            following_url:
                "https://api.github.com/users/alice/following{/other_user}",
            gists_url: "https://api.github.com/users/alice/gists{/gist_id}",
            starred_url:
                "https://api.github.com/users/alice/starred{/owner}{/repo}",
            subscriptions_url:
                "https://api.github.com/users/alice/subscriptions",
            organizations_url: "https://api.github.com/users/alice/orgs",
            repos_url: "https://api.github.com/users/alice/repos",
            events_url: "https://api.github.com/users/alice/events{/privacy}",
            received_events_url:
                "https://api.github.com/users/alice/received_events",
            type: "User",
            site_admin: false,
        },
        committer: {
            login: "alice",
            id: 101,
            node_id: "MDQ6VXNlcjEwMQ==",
            avatar_url: "https://avatars.githubusercontent.com/u/101?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/alice",
            html_url: "https://github.com/alice",
            followers_url: "https://api.github.com/users/alice/followers",
            following_url:
                "https://api.github.com/users/alice/following{/other_user}",
            gists_url: "https://api.github.com/users/alice/gists{/gist_id}",
            starred_url:
                "https://api.github.com/users/alice/starred{/owner}{/repo}",
            subscriptions_url:
                "https://api.github.com/users/alice/subscriptions",
            organizations_url: "https://api.github.com/users/alice/orgs",
            repos_url: "https://api.github.com/users/alice/repos",
            events_url: "https://api.github.com/users/alice/events{/privacy}",
            received_events_url:
                "https://api.github.com/users/alice/received_events",
            type: "User",
            site_admin: false,
        },
        parents: [
            {
                sha: "0000000000000000000000000000000000000000",
                url: "https://api.github.com/repos/OWNER/REPO/commits/0000000000000000000000000000000000000000",
                html_url:
                    "https://github.com/OWNER/REPO/commit/0000000000000000000000000000000000000000",
            },
        ],
    },
    {
        sha: "2222222222222222222222222222222222222222",
        node_id: "MDY6Q29tbWl0MjIyMjIyMjIyMjIyMjIyMg==",
        commit: {
            author: {
                name: "bob",
                email: "bob@example.com",
                date: "2025-05-14T09:00:00Z",
            },
            committer: {
                name: "bob",
                email: "bob@example.com",
                date: "2025-05-14T09:00:00Z",
            },
            message: "fix: 로그인 폼 유효성 검사 수정",
            tree: {
                sha: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
                url: "https://api.github.com/repos/OWNER/REPO/git/trees/bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
            },
            url: "https://api.github.com/repos/OWNER/REPO/git/commits/2222222222222222222222222222222222222222",
            comment_count: 0,
            verification: {
                verified: false,
                reason: "unsigned",
                signature: null,
                payload: null,
                verified_at: null,
            },
        },
        url: "https://api.github.com/repos/OWNER/REPO/commits/2222222222222222222222222222222222222222",
        html_url:
            "https://github.com/OWNER/REPO/commit/2222222222222222222222222222222222222222",
        comments_url:
            "https://api.github.com/repos/OWNER/REPO/commits/2222222222222222222222222222222222222222/comments",
        author: {
            login: "bob",
            id: 102,
            node_id: "MDQ6VXNlcjEwMg==",
            avatar_url: "https://avatars.githubusercontent.com/u/102?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/bob",
            html_url: "https://github.com/bob",
            followers_url: "https://api.github.com/users/bob/followers",
            following_url:
                "https://api.github.com/users/bob/following{/other_user}",
            gists_url: "https://api.github.com/users/bob/gists{/gist_id}",
            starred_url:
                "https://api.github.com/users/bob/starred{/owner}{/repo}",
            subscriptions_url: "https://api.github.com/users/bob/subscriptions",
            organizations_url: "https://api.github.com/users/bob/orgs",
            repos_url: "https://api.github.com/users/bob/repos",
            events_url: "https://api.github.com/users/bob/events{/privacy}",
            received_events_url:
                "https://api.github.com/users/bob/received_events",
            type: "User",
            site_admin: false,
        },
        committer: {
            login: "bob",
            id: 102,
            node_id: "MDQ6VXNlcjEwMg==",
            avatar_url: "https://avatars.githubusercontent.com/u/102?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/bob",
            html_url: "https://github.com/bob",
            followers_url: "https://api.github.com/users/bob/followers",
            following_url:
                "https://api.github.com/users/bob/following{/other_user}",
            gists_url: "https://api.github.com/users/bob/gists{/gist_id}",
            starred_url:
                "https://api.github.com/users/bob/starred{/owner}{/repo}",
            subscriptions_url: "https://api.github.com/users/bob/subscriptions",
            organizations_url: "https://api.github.com/users/bob/orgs",
            repos_url: "https://api.github.com/users/bob/repos",
            events_url: "https://api.github.com/users/bob/events{/privacy}",
            received_events_url:
                "https://api.github.com/users/bob/received_events",
            type: "User",
            site_admin: false,
        },
        parents: [
            {
                sha: "1111111111111111111111111111111111111111",
                url: "https://api.github.com/repos/OWNER/REPO/commits/1111111111111111111111111111111111111111",
                html_url:
                    "https://github.com/OWNER/REPO/commit/1111111111111111111111111111111111111111",
            },
        ],
    },
];

export const MOCK_COMMIT_1 = {
    sha: "1111111111111111111111111111111111111111",
    node_id: "MDY6Q29tbWl0MTExMTExMTExMTExMTExMQ==",
    commit: {
        author: {
            name: "alice",
            email: "alice@example.com",
            date: "2025-05-14T08:00:00Z",
        },
        committer: {
            name: "alice",
            email: "alice@example.com",
            date: "2025-05-14T08:00:00Z",
        },
        message: "feat: 로그인 페이지 구현",
        tree: {
            sha: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            url: "https://api.github.com/repos/OWNER/REPO/git/trees/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        },
        url: "https://api.github.com/repos/OWNER/REPO/git/commits/1111111111111111111111111111111111111111",
        comment_count: 0,
        verification: {
            verified: false,
            reason: "unsigned",
            signature: null,
            payload: null,
            verified_at: null,
        },
    },
    url: "https://api.github.com/repos/OWNER/REPO/commits/1111111111111111111111111111111111111111",
    html_url:
        "https://github.com/OWNER/REPO/commit/1111111111111111111111111111111111111111",
    comments_url:
        "https://api.github.com/repos/OWNER/REPO/commits/1111111111111111111111111111111111111111/comments",
    author: {
        login: "alice",
        id: 101,
        node_id: "MDQ6VXNlcjEwMQ==",
        avatar_url: "https://avatars.githubusercontent.com/u/101?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/alice",
        html_url: "https://github.com/alice",
        followers_url: "https://api.github.com/users/alice/followers",
        following_url:
            "https://api.github.com/users/alice/following{/other_user}",
        gists_url: "https://api.github.com/users/alice/gists{/gist_id}",
        starred_url:
            "https://api.github.com/users/alice/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/alice/subscriptions",
        organizations_url: "https://api.github.com/users/alice/orgs",
        repos_url: "https://api.github.com/users/alice/repos",
        events_url: "https://api.github.com/users/alice/events{/privacy}",
        received_events_url:
            "https://api.github.com/users/alice/received_events",
        type: "User",
        site_admin: false,
    },
    committer: {
        login: "alice",
        id: 101,
        node_id: "MDQ6VXNlcjEwMQ==",
        avatar_url: "https://avatars.githubusercontent.com/u/101?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/alice",
        html_url: "https://github.com/alice",
        followers_url: "https://api.github.com/users/alice/followers",
        following_url:
            "https://api.github.com/users/alice/following{/other_user}",
        gists_url: "https://api.github.com/users/alice/gists{/gist_id}",
        starred_url:
            "https://api.github.com/users/alice/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/alice/subscriptions",
        organizations_url: "https://api.github.com/users/alice/orgs",
        repos_url: "https://api.github.com/users/alice/repos",
        events_url: "https://api.github.com/users/alice/events{/privacy}",
        received_events_url:
            "https://api.github.com/users/alice/received_events",
        type: "User",
        site_admin: false,
    },
    parents: [
        {
            sha: "0000000000000000000000000000000000000000",
            url: "https://api.github.com/repos/OWNER/REPO/commits/0000000000000000000000000000000000000000",
            html_url:
                "https://github.com/OWNER/REPO/commit/0000000000000000000000000000000000000000",
        },
    ],
    files: [
        {
            sha: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            filename: "src/pages/login.tsx",
            status: "added",
            additions: 120,
            deletions: 0,
            changes: 120,
            blob_url:
                "https://github.com/OWNER/REPO/blob/1111111111111111111111111111111111111111/src/pages/login.tsx",
            raw_url:
                "https://github.com/OWNER/REPO/raw/1111111111111111111111111111111111111111/src/pages/login.tsx",
            contents_url:
                "https://api.github.com/repos/OWNER/REPO/contents/src/pages/login.tsx?ref=1111111111111111111111111111111111111111",
            patch:
                "@@ -0,0 +1,120 @@\n" +
                "+import React from 'react';\n" +
                "+// 로그인 폼 구현 시작\n" +
                "+export default function LoginPage() {\n" +
                "+  const [email, setEmail] = useState('');\n" +
                "+  const [password, setPassword] = useState('');\n" +
                "+  // TODO: 유효성 검사 로직\n" +
                "+  return (\n" +
                "+    <form>…</form>\n" +
                "+  );\n" +
                "}\n",
        },
        {
            sha: "cccccccccccccccccccccccccccccccccccccccc",
            filename: "src/components/LoginForm.tsx",
            status: "added",
            additions: 80,
            deletions: 0,
            changes: 80,
            blob_url:
                "https://github.com/OWNER/REPO/blob/1111111111111111111111111111111111111111/src/components/LoginForm.tsx",
            raw_url:
                "https://github.com/OWNER/REPO/raw/1111111111111111111111111111111111111111/src/components/LoginForm.tsx",
            contents_url:
                "https://api.github.com/repos/OWNER/REPO/contents/src/components/LoginForm.tsx?ref=1111111111111111111111111111111111111111",
            patch:
                "@@ -0,0 +1,80 @@\n" +
                "+import React from 'react';\n" +
                "+// 로그인 폼 UI 컴포넌트\n" +
                "+export function LoginForm() {\n" +
                "+  return (\n" +
                "+    <div>\n" +
                '+      <input placeholder="Email" />\n' +
                '+      <input placeholder="Password" />\n' +
                "+      <button>로그인</button>\n" +
                "+    </div>\n" +
                "+  );\n" +
                "}\n",
        },
        {
            sha: "dddddddddddddddddddddddddddddddddddddddd",
            filename: "src/styles/login.css",
            status: "added",
            additions: 20,
            deletions: 0,
            changes: 20,
            blob_url:
                "https://github.com/OWNER/REPO/blob/1111111111111111111111111111111111111111/src/styles/login.css",
            raw_url:
                "https://github.com/OWNER/REPO/raw/1111111111111111111111111111111111111111/src/styles/login.css",
            contents_url:
                "https://api.github.com/repos/OWNER/REPO/contents/src/styles/login.css?ref=1111111111111111111111111111111111111111",
            patch:
                "@@ -0,0 +1,20 @@\n" +
                "+.login-container {\n" +
                "+  display: flex;\n" +
                "+  flex-direction: column;\n" +
                "+  gap: 10px;\n" +
                "+}\n" +
                "+.login-input {\n" +
                "+  padding: 8px;\n" +
                "+  border: 1px solid #ccc;\n" +
                "+}\n",
        },
    ],
};

export const MOCK_COMMIT_2 = {
    sha: "2222222222222222222222222222222222222222",
    node_id: "MDY6Q29tbWl0MjIyMjIyMjIyMjIyMjIyMg==",
    commit: {
        author: {
            name: "bob",
            email: "bob@example.com",
            date: "2025-05-14T09:00:00Z",
        },
        committer: {
            name: "bob",
            email: "bob@example.com",
            date: "2025-05-14T09:00:00Z",
        },
        message: "fix: 로그인 폼 유효성 검사 수정",
        tree: {
            sha: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
            url: "https://api.github.com/repos/OWNER/REPO/git/trees/bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        },
        url: "https://api.github.com/repos/OWNER/REPO/git/commits/2222222222222222222222222222222222222222",
        comment_count: 0,
        verification: {
            verified: false,
            reason: "unsigned",
            signature: null,
            payload: null,
            verified_at: null,
        },
    },
    url: "https://api.github.com/repos/OWNER/REPO/commits/2222222222222222222222222222222222222222",
    html_url:
        "https://github.com/OWNER/REPO/commit/2222222222222222222222222222222222222222",
    comments_url:
        "https://api.github.com/repos/OWNER/REPO/commits/2222222222222222222222222222222222222222/comments",
    author: {
        login: "bob",
        id: 102,
        node_id: "MDQ6VXNlcjEwMg==",
        avatar_url: "https://avatars.githubusercontent.com/u/102?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/bob",
        html_url: "https://github.com/bob",
        followers_url: "https://api.github.com/users/bob/followers",
        following_url:
            "https://api.github.com/users/bob/following{/other_user}",
        gists_url: "https://api.github.com/users/bob/gists{/gist_id}",
        starred_url: "https://api.github.com/users/bob/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/bob/subscriptions",
        organizations_url: "https://api.github.com/users/bob/orgs",
        repos_url: "https://api.github.com/users/bob/repos",
        events_url: "https://api.github.com/users/bob/events{/privacy}",
        received_events_url: "https://api.github.com/users/bob/received_events",
        type: "User",
        site_admin: false,
    },
    committer: {
        login: "bob",
        id: 102,
        node_id: "MDQ6VXNlcjEwMg==",
        avatar_url: "https://avatars.githubusercontent.com/u/102?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/bob",
        html_url: "https://github.com/bob",
        followers_url: "https://api.github.com/users/bob/followers",
        following_url:
            "https://api.github.com/users/bob/following{/other_user}",
        gists_url: "https://api.github.com/users/bob/gists{/gist_id}",
        starred_url: "https://api.github.com/users/bob/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/bob/subscriptions",
        organizations_url: "https://api.github.com/users/bob/orgs",
        repos_url: "https://api.github.com/users/bob/repos",
        events_url: "https://api.github.com/users/bob/events{/privacy}",
        received_events_url: "https://api.github.com/users/bob/received_events",
        type: "User",
        site_admin: false,
    },
    parents: [
        {
            sha: "1111111111111111111111111111111111111111",
            url: "https://api.github.com/repos/OWNER/REPO/commits/1111111111111111111111111111111111111111",
            html_url:
                "https://github.com/OWNER/REPO/commit/1111111111111111111111111111111111111111",
        },
    ],
    files: [
        {
            sha: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            filename: "src/components/LoginForm.tsx",
            status: "modified",
            additions: 5,
            deletions: 2,
            changes: 7,
            blob_url:
                "https://github.com/OWNER/REPO/blob/2222222222222222222222222222222222222222/src/components/LoginForm.tsx",
            raw_url:
                "https://github.com/OWNER/REPO/raw/2222222222222222222222222222222222222222/src/components/LoginForm.tsx",
            contents_url:
                "https://api.github.com/repos/OWNER/REPO/contents/src/components/LoginForm.tsx?ref=2222222222222222222222222222222222222222",
            patch:
                "@@ -10,7 +10,10 @@ function LoginForm() {\n" +
                "-  const [email, setEmail] = useState('');\n" +
                "+  const [email, setEmail] = useState(''); // 유효성 검사 추가\n" +
                "+  const [error, setError] = useState('');\n" +
                "+  // if (!isValidEmail(email)) setError('잘못된 이메일');\n" +
                "+  return (\n" +
                "+    <form>…</form>\n" +
                "+  );\n",
        },
        {
            sha: "ffffffffffffffffffffffffffffffffffffffff",
            filename: "src/styles/login.css",
            status: "modified",
            additions: 2,
            deletions: 1,
            changes: 3,
            blob_url:
                "https://github.com/OWNER/REPO/blob/2222222222222222222222222222222222222222/src/styles/login.css",
            raw_url:
                "https://github.com/OWNER/REPO/raw/2222222222222222222222222222222222222222/src/styles/login.css",
            contents_url:
                "https://api.github.com/repos/OWNER/REPO/contents/src/styles/login.css?ref=2222222222222222222222222222222222222222",
            patch:
                "@@ -3,6 +3,7 @@ .login-input {\n" +
                "-  border: 1px solid #ccc;\n" +
                "+  border: 1px solid #f00; /* 에러일 때 빨강 */\n" +
                "+  background-color: #fee;\n",
        },
        {
            sha: "gggggggggggggggggggggggggggggggggggggg",
            filename: "src/utils/validation.ts",
            status: "modified",
            additions: 3,
            deletions: 0,
            changes: 3,
            blob_url:
                "https://github.com/OWNER/REPO/blob/2222222222222222222222222222222222222222/src/utils/validation.ts",
            raw_url:
                "https://github.com/OWNER/REPO/raw/2222222222222222222222222222222222222222/src/utils/validation.ts",
            contents_url:
                "https://api.github.com/repos/OWNER/REPO/contents/src/utils/validation.ts?ref=2222222222222222222222222222222222222222",
            patch:
                "@@ -15,6 +15,9 @@ export function isValidEmail(email: string) {\n" +
                "+  if (!/.+@.+\\..+/.test(email)) {\n" +
                "+    throw new Error('올바르지 않은 이메일 형식입니다.');\n" +
                "+  }\n" +
                "+  return true;\n",
        },
    ],
};

const MOCK_COMMITS: Record<string, CommitType> = {
    "1111111111111111111111111111111111111111": MOCK_COMMIT_1,
    "2222222222222222222222222222222222222222": MOCK_COMMIT_2,
};

export default function PullRequestMemoir() {
    // 임시 코드
    const [selectedSha, setSelectedSha] = useState<string>(MOCK_PR[0].sha);
    const currentCommit = MOCK_COMMITS[selectedSha];

    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const { pr_no }: { pr_no: string } = useParams();

    const options: Option[] = MOCK_PR.map((commit) => ({
        value: commit.sha, // SHA를 value로
        label: commit.commit.message, // 커밋 메시지를 label로
    }));

    function handleChange(sha: string) {
        setSelectedSha(sha); // 선택 상태 업데이트
    }

    useEffect(() => {
        setSelectedFile(null);
    }, [selectedSha]);

    return (
        <CreateMemoirLayout>
            <AccordionSidebar
                files={useExtractFilenames(COMMITS.files)}
                selectedFile={selectedFile}
                onSelect={setSelectedFile}
            />
            <div className="grid grid-cols-2">
                <ChangeListLayout>
                    <Select
                        options={options}
                        value={selectedSha}
                        onChange={handleChange}
                    />
                    <ChangeList
                        changes={currentCommit.files}
                        selectedFile={selectedFile}
                    />
                </ChangeListLayout>
                <div className="col-span-1 flex flex-col justify-between gap-4 p-4">
                    <EditorForm
                        initialTitle=""
                        initialTags={[]}
                        initialContent={[]}
                        sourceId={pr_no}
                        typeId={2}
                    />
                </div>
            </div>
        </CreateMemoirLayout>
    );
}
