import { GitObjectType } from "./ShareType";

export type FileChangeType = {
    sha: string;
    filename: string;
    status: string;
    additions: number;
    deletions: number;
    changes: number;
    blob_url: string;
    raw_url: string;
    contents_url: string;
    patch: string;
};

export type CommitType = GitObjectType & {
    files: FileChangeType[];
};
