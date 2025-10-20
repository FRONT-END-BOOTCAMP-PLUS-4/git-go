export interface Commit {
    sha: string;
    type:
        | "feat"
        | "fix"
        | "chore"
        | "merge"
        | "refactor"
        | "test"
        | "docs"
        | "style"
        | "etc";
    message: string;
    repo: string;
    branch: string;
    createdAt: string;
}
export interface Repo {
    id: number;
    name: string;
    nameWithOwner: string;
}
