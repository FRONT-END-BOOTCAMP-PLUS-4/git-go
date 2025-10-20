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
export interface LabelBadgeProps {
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
}

export interface CardInfoProps {
    sha: string;
    message: string;
    branch: string;
    repo: string;
    commitType: LabelBadgeProps["type"];
    createdAt: string;
}
