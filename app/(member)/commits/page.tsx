export default function CommitPage() {
    // TODO: 사이드바와 탭 부분은 공통 컴포넌트로 작성해서 각 페이지마다 넣기.
    return <div>CommitPage</div>;
}

// "use client";

// import { useState } from "react";
// import RepoSelectModal from "../components/RepoSelectModal";

// export default function CommitPage() {
//     const [open, setOpen] = useState(false);

//     return (
//         <div className="p-4">
//             <button
//                 onClick={() => setOpen(true)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-md"
//             >
//                 저장소 추가
//             </button>

//             <RepoSelectModal open={open} onClose={() => setOpen(false)} />
//         </div>
//     );
// }
