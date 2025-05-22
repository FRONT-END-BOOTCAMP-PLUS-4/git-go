export interface FileTreeNode {
    name: string;
    type: 'file' | 'directory';
    children?: FileTreeNode[];
}

export interface ChangedFile {
    filename: string;
    status: 'added' | 'modified' | 'removed';
    additions: number;
    deletions: number;
    changes: number;
    raw_url?: string;
    patch?: string;
}

export interface GithubCommitDetailRequestDto {
    nameWithOwner: string;
    sha: string;
    accessToken: string; // ✅ 추가된 필드
}

export interface GithubCommitDetailResponseDto {
    sha: string;
    message: string;
    authorName: string;
    authorDate: string;
    filesChanged: FileTreeNode[];
    changedFiles: ChangedFile[];
}
