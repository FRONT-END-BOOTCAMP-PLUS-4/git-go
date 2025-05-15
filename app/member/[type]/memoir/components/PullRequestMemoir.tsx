// "use client";

// import { useState } from "react";
// import AiSummary from "./AiSummary";
// import ChangeList from "./ChangeList";
// import CreateMemoirLayout from "./CreateMemoirLayout";
// import Editor from "./Editor";
// import FileTree from "./FileTree";
// import Select from "./Select";

// export type FileNode = {
//     name: string;
//     changes?: string[];
//     children?: FileNode[];
// };

// export type PRCommit = {
//     id: string; // 커밋 해시나 번호
//     message: string; // 커밋 메시지
//     author: string; // 작성자
//     date: string; // 커밋 일시
//     tree: FileNode[]; // 이 커밋에서 변경된 파일 트리
// };

// export const prCommits: PRCommit[] = [
//     {
//         id: "a1b2c3d",
//         message: "feat: 로그인 API 에러 핸들링 추가",
//         author: "yoonstar",
//         date: "2025-05-14T10:32:00Z",
//         tree: [
//             {
//                 name: "src/components/AuthService.ts",
//                 changes: [
//                     "- 에러 응답 처리 로직 누락 제거",
//                     "+ 401/403 에러 시 자동 로그아웃 트리거 추가",
//                     "+ 공통 `handleError` 헬퍼 함수 사용하도록 리팩터링",
//                     "- 렌더링 기본 테스트만 있던 부분 삭제",
//                     "+ `preventDefault` 호출 여부 검증 테스트 추가",
//                     "+ 버튼 Disabled 상태 테스트 추가",
//                     "- 렌더링 기본 테스트만 있던 부분 삭제2",
//                     "+ `preventDefault` 호출 여부 검증 테스트 추가2",
//                     "+ 버튼 Disabled 상태 테스트 추가2",
//                     "- 렌더링 기본 테스트만 있던 부분 삭제23",
//                     "+ `preventDefault` 호출 여부 검증 테스트 추가23",
//                     "+ 버튼 Disabled 상태 테스트 추가23",
//                     "- 렌더링 기본 테스트만 있던 부분 삭제24",
//                     "+ `preventDefault` 호출 여부 검증 테스트 추가24",
//                     "+ 버튼 Disabled 상태 테스트 추가24",
//                     "- 렌더링 기본 테스트만 있던 부분 삭제25",
//                     "+ `preventDefault` 호출 여부 검증 테스트 추가25",
//                     "+ 버튼 Disabled 상태 테스트 추가25",
//                 ],
//             },
//             {
//                 name: "src/shared/utils/http.ts",
//                 changes: [
//                     "+ `handleError` 함수 신규 추가",
//                     "+ HTTP_STATUS 403 일 때 토큰 리프레시 로직 분기 추가",
//                     "- 렌더링 기본 테스트만 있던 부분 삭제",
//                     "+ `preventDefault` 호출 여부 검증 테스트 추가",
//                     "+ 버튼 Disabled 상태 테스트 추가",
//                     "- 렌더링 기본 테스트만 있던 부분 삭제2",
//                     "+ `preventDefault` 호출 여부 검증 테스트 추가2",
//                     "+ 버튼 Disabled 상태 테스트 추가2",
//                     "- 렌더링 기본 테스트만 있던 부분 삭제23",
//                     "+ `preventDefault` 호출 여부 검증 테스트 추가23",
//                     "+ 버튼 Disabled 상태 테스트 추가23",
//                     "- 렌더링 기본 테스트만 있던 부분 삭제24",
//                     "+ `preventDefault` 호출 여부 검증 테스트 추가24",
//                     "+ 버튼 Disabled 상태 테스트 추가24",
//                     "- 렌더링 기본 테스트만 있던 부분 삭제25",
//                     "+ `preventDefault` 호출 여부 검증 테스트 추가25",
//                     "+ 버튼 Disabled 상태 테스트 추가25",
//                 ],
//             },
//         ],
//     },
//     {
//         id: "d4e5f6g",
//         message: "fix: LoginForm submit 중복 방지 로직 버그 수정",
//         author: "yoonstar",
//         date: "2025-05-14T11:10:00Z",
//         tree: [
//             {
//                 name: "src/components/LoginForm.tsx",
//                 changes: [
//                     "- submit 버튼 클릭 시 `isLoading` 플래그가 해제되지 않던 버그 수정",
//                     "+ `finally` 블록에서 `setIsLoading(false)` 호출 추가",
//                     "- 렌더링 기본 테스트만 있던 부분 삭제",
//                     "+ `preventDefault` 호출 여부 검증 테스트 추가",
//                     "+ 버튼 Disabled 상태 테스트 추가",
//                     "- 렌더링 기본 테스트만 있던 부분 삭제2",
//                     "+ `preventDefault` 호출 여부 검증 테스트 추가2",
//                     "+ 버튼 Disabled 상태 테스트 추가2",
//                     "- 렌더링 기본 테스트만 있던 부분 삭제23",
//                     "+ `preventDefault` 호출 여부 검증 테스트 추가23",
//                     "+ 버튼 Disabled 상태 테스트 추가23",
//                     "- 렌더링 기본 테스트만 있던 부분 삭제24",
//                     "+ `preventDefault` 호출 여부 검증 테스트 추가24",
//                     "+ 버튼 Disabled 상태 테스트 추가24",
//                     "- 렌더링 기본 테스트만 있던 부분 삭제25",
//                     "+ `preventDefault` 호출 여부 검증 테스트 추가25",
//                     "+ 버튼 Disabled 상태 테스트 추가25",
//                 ],
//             },
//             {
//                 name: "src/components/Spinner.tsx",
//                 changes: [
//                     "+ 로딩 스피너 컴포넌트 신규 추가",
//                     "- 렌더링 기본 테스트만 있던 부분 삭제",
//                     "+ `preventDefault` 호출 여부 검증 테스트 추가",
//                     "+ 버튼 Disabled 상태 테스트 추가",
//                     "- 렌더링 기본 테스트만 있던 부분 삭제2",
//                     "+ `preventDefault` 호출 여부 검증 테스트 추가2",
//                     "+ 버튼 Disabled 상태 테스트 추가2",
//                     "- 렌더링 기본 테스트만 있던 부분 삭제23",
//                     "+ `preventDefault` 호출 여부 검증 테스트 추가23",
//                     "+ 버튼 Disabled 상태 테스트 추가23",
//                     "- 렌더링 기본 테스트만 있던 부분 삭제24",
//                     "+ `preventDefault` 호출 여부 검증 테스트 추가24",
//                     "+ 버튼 Disabled 상태 테스트 추가24",
//                     "- 렌더링 기본 테스트만 있던 부분 삭제25",
//                     "+ `preventDefault` 호출 여부 검증 테스트 추가25",
//                     "+ 버튼 Disabled 상태 테스트 추가25",
//                 ],
//             },
//         ],
//     },
//     {
//         id: "h7i8j9k",
//         message: "chore: 패키지 버전 업데이트 및 타입 보강",
//         author: "yoonstar",
//         date: "2025-05-14T11:45:00Z",
//         tree: [
//             {
//                 name: "package.json",
//                 changes: [
//                     "- axios@0.27.0 → axios@1.2.0",
//                     "- types/jest@27 → types/jest@29",
//                     "+ axios@0.27.0 → axios@1.2.0",
//                     "+ types/jest@27 → types/jest@29",
//                     "- axios@0.28.0 → axios@1.2.0",
//                     "- types/jest@28 → types/jest@29",
//                     "- axios@0.9.0 → axios@1.2.0",
//                     "- types/jest@9 → types/jest@29",
//                     "- axios@0.7.0 → axios@1.2.0",
//                     "- types/jest@7 → types/jest@29",
//                     "- axios@0.30.0 → axios@1.2.0",
//                     "- types/jest@30 → types/jest@29",
//                     "- axios@0.50.0 → axios@1.2.0",
//                     "- types/jest@50 → types/jest@29",
//                     "- axios@023.0 → axios@1.2.0",
//                     "- types/jest23 → types/jest@29",
//                 ],
//             },
//             {
//                 name: "tsconfig.json",
//                 changes: [
//                     "+ `strictNullChecks` 옵션 활성화",
//                     "+ `noImplicitAny` 옵션 활성화",
//                     "- axios@0.27.0 → axios@1.2.0",
//                     "- types/jest@27 → types/jest@29",
//                     "+ axios@0.27.0 → axios@1.2.0",
//                     "+ types/jest@27 → types/jest@29",
//                     "- axios@0.28.0 → axios@1.2.0",
//                     "- types/jest@28 → types/jest@29",
//                     "- axios@0.9.0 → axios@1.2.0",
//                     "- types/jest@9 → types/jest@29",
//                     "- axios@0.7.0 → axios@1.2.0",
//                     "- types/jest@7 → types/jest@29",
//                     "- axios@0.30.0 → axios@1.2.0",
//                     "- types/jest@30 → types/jest@29",
//                     "- axios@0.50.0 → axios@1.2.0",
//                     "- types/jest@50 → types/jest@29",
//                     "- axios@023.0 → axios@1.2.0",
//                     "- types/jest23 → types/jest@29",
//                 ],
//             },
//         ],
//     },
// ];

export default function PullRequestMemoir() {
    //     // 1) 어떤 커밋을 보고 있을지 state
    //     const [selectedCommitId, setSelectedCommitId] = useState<string>(
    //         prCommits[0].id
    //     );
    //     // 2) 그 커밋 안에서 어떤 파일을 보고 있을지 state
    //     const [selectedFile, setSelectedFile] = useState<string | null>(null);

    //     // 3) 현재 선택된 커밋 데이터를 찾아서
    //     const currentCommit: PRCommit = prCommits.find(
    //         (c) => c.id === selectedCommitId
    //     )!;

    return (
        //         <CreateMemoirLayout>
        //             <FileTree
        //                 treeData={currentCommit.tree}
        //                 onSelect={setSelectedFile}
        //             />

        //             <div className="border-x-border-primary1 w-full max-w-[575px] border-x p-4">
        //                 <Select
        //                     options={prCommits.map((c) => ({
        //                         value: c.id,
        //                         label: c.message,
        //                     }))}
        //                     value={selectedCommitId}
        //                     onChange={(id) => {
        //                         setSelectedCommitId(id);
        //                         setSelectedFile(null);
        //                     }}
        //                 />

        //                 <ChangeList
        //                     treeData={currentCommit.tree}
        //                     selectedFile={selectedFile}
        //                     selectedCommitId={selectedCommitId}
        //                     className="h-[calc(100vh-151px)]"
        //                 />
        //             </div>

        //             <div className="flex w-full flex-col gap-4 p-4">
        //                 <Editor />
        //                 <AiSummary />
        //                 <div className="flex justify-end gap-2">
        //                     <button className="border-border-primary1 rounded-md border px-4 py-2">
        //                         취소
        //                     </button>
        //                     <button className="bg-primary7 text-text-primary1 rounded-md px-4 py-2">
        //                         회고록 작성 완료
        //                     </button>
        //                 </div>
        //             </div>
        //         </CreateMemoirLayout>
        <div>PullRequest Memoir Component</div>
    );
}
