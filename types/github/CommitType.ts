export type CommitType = {
    authorDate: string;
    authorName: string;
    changeDetail: ChangeDetail[];
    filesChanged: FileChangeNode[];
    message: string;
    sha: string;
};

export type FileChangeNode = {
    name: string;
    type: "file" | "directory";
    children?: FileChangeNode[];
};

export type ChangeDetail = {
    additions: number;
    changes: number;
    deletions: number;
    filename: string;
    patch: string;
    raw_url: string;
    status: string;
};
