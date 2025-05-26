import { CommitType } from "@/types/github/CommitType";

export function useSimplifyCommitData(commit: CommitType) {
    const message = commit.message;
    const filesInfo = commit.changeDetail.map((file) => {
        return {
            filename: file.filename,
            patch: file.patch,
        };
    });

    return {
        promptInput: JSON.stringify({
            message,
            files: filesInfo,
        }),
    };
}
