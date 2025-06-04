export interface FileTreeNode {
    name: string;
    type: "file" | "directory";
    children?: FileTreeNode[];
}

export interface ChangedFile {
    filename: string;
    status: "added" | "modified" | "removed";
    additions: number;
    deletions: number;
    changes: number;
    raw_url?: string;
    patch?: string;
}

export interface GithubPrCommitDetailRequestDto {
    nameWithOwner: string;
    sha: string;
    accessToken: string;
}

export interface GithubPrCommitDetailResponseDto {
    sha: string;
    message: string;
    authorName: string;
    authorDate: string;
    filesChanged: FileTreeNode[];
    changeDetail: ChangedFile[]; // ✅ 새로 추가된 필드
}
