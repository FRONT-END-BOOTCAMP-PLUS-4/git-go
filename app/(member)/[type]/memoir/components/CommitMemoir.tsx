import { useState } from "react";
import AiSummary from "./AiSummary";
import ChangeList from "./ChangeList";
import Editor from "./Editor";
import FileTree, { FileNode } from "./FileTree";

const treeData: FileNode[] = [
    {
        name: "src/",
        children: [
            {
                name: "components/",
                children: [
                    {
                        name: "AuthService.ts",
                        changes: [
                            "- 로그인 API 호출에서 `fetch` 사용하던 부분 제거",
                            "+ Axios 기반 로그인 API 호출 로직 추가",
                            "- 토큰 저장: sessionStorage 방식 삭제",
                            "+ 토큰 저장: localStorage 방식으로 변경",
                        ],
                    },
                    {
                        name: "LoginForm.tsx",
                        changes: [
                            "- form 제출 시 리로드하던 로직 삭제",
                            "+ `preventDefault`로 페이지 리로드 방지 추가",
                            "- 버튼 클릭 중복 처리 로직 삭제",
                            "+ `isLoading` 상태로 버튼 Disabled 처리 추가",
                        ],
                    },
                ],
            },
            {
                name: "utils/",
                children: [
                    {
                        name: "validation.ts",
                        changes: [
                            "- 이메일 Regex: `/.+@.+\\..+/` 패턴 제거",
                            "+ 이메일 Regex: RFC 5322 기반 강화된 패턴 추가",
                            "- 비밀번호 체크 로직 미비 제거",
                            "+ `minLength: 8` 검증 함수 추가",
                        ],
                    },
                    {
                        name: "constants.ts",
                        changes: [
                            "- `BASE_URL` 하드코딩 삭제",
                            "+ `API_BASE_URL = process.env.API_URL`로 변경",
                            "- HTTP 상태 코드 직접 숫자 사용 삭제",
                            "+ `HTTP_STATUS` 객체 매핑 정의",
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: "tests/",
        children: [
            {
                name: "AuthService.test.ts",
                changes: [
                    "- 초기 테스트 스켈레톤 삭제",
                    "+ 로그인 성공 시 토큰 반환 케이스 추가",
                    "+ 네트워크 오류 시 예외 처리 테스트 추가",
                ],
            },
            {
                name: "LoginForm.test.tsx",
                changes: [
                    "- 렌더링 기본 테스트만 있던 부분 삭제",
                    "+ `preventDefault` 호출 여부 검증 테스트 추가",
                    "+ 버튼 Disabled 상태 테스트 추가",
                    "- 렌더링 기본 테스트만 있던 부분 삭제2",
                    "+ `preventDefault` 호출 여부 검증 테스트 추가2",
                    "+ 버튼 Disabled 상태 테스트 추가2",
                    "- 렌더링 기본 테스트만 있던 부분 삭제23",
                    "+ `preventDefault` 호출 여부 검증 테스트 추가23",
                    "+ 버튼 Disabled 상태 테스트 추가23",
                    "- 렌더링 기본 테스트만 있던 부분 삭제24",
                    "+ `preventDefault` 호출 여부 검증 테스트 추가24",
                    "+ 버튼 Disabled 상태 테스트 추가24",
                    "- 렌더링 기본 테스트만 있던 부분 삭제25",
                    "+ `preventDefault` 호출 여부 검증 테스트 추가25",
                    "+ 버튼 Disabled 상태 테스트 추가25",
                ],
            },
        ],
    },
];

export default function CommitMemoir() {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    return (
        <div className="mx-auto flex h-[calc(100vh-64px)] w-full max-w-[1920px] px-5">
            <FileTree treeData={treeData} onSelect={setSelectedFile} />
            <ChangeList treeData={treeData} selectedFile={selectedFile} />
            <div className="flex w-full flex-col gap-4 p-4">
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
        </div>
    );
}
