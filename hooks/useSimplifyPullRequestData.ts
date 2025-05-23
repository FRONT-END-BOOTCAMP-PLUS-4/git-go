import { PullRequestType } from "@/types/github/PullRequestType";

export function useSimplifyPullRequestData(pullRequest: PullRequestType[]) {
    const messageInfo = pullRequest.map((commit) => {
        return {
            message: commit.message,
        };
    });

    return {
        promptInput: JSON.stringify({
            messageInfo: messageInfo,
        }),
    };
}
