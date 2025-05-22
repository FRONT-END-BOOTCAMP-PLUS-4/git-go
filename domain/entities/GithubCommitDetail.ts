export class GithubCommitDetail {
    constructor(
        public sha: string,
        public message: string,
        public authorName: string,
        public authorDate: string,
        public filesChanged: FileTreeNode[],
        public changedFiles: ChangedFile[]
    ) { }
}

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
