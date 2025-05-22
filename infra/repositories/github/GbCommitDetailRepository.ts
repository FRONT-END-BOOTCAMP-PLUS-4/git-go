import { GithubCommitDetailRepository } from '@/domain/repositories/GithubCommitDetailRepository';
import { GithubCommitDetail, FileTreeNode, ChangedFile } from '@/domain/entities/GithubCommitDetail';

export class GbCommitDetailRepository implements GithubCommitDetailRepository {
    async getCommitDetail(
        nameWithOwner: string,
        sha: string,
        accessToken: string // ✅ accessToken 인자로 받음
    ): Promise<GithubCommitDetail> {
        if (!accessToken) throw new Error('No access token provided');

        const res = await fetch(`https://api.github.com/repos/${nameWithOwner}/commits/${sha}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/vnd.github+json',
            },
        });

        if (!res.ok) throw new Error('GitHub API 호출 실패');

        const data = await res.json();

        const filePaths: string[] = data.files.map((file: any) => file.filename);
        const tree = this.buildFileTree(filePaths);

        const changedFiles: ChangedFile[] = data.files.map((file: any) => ({
            filename: file.filename,
            status: file.status,
            additions: file.additions,
            deletions: file.deletions,
            changes: file.changes,
            raw_url: file.raw_url,
            patch: file.patch,
        }));

        return new GithubCommitDetail(
            data.sha,
            data.commit.message,
            data.commit.author.name,
            data.commit.author.date,
            tree,
            changedFiles
        );
    }

    private buildFileTree(paths: string[]): FileTreeNode[] {
        const root: Record<string, any> = {};

        for (const path of paths) {
            const parts = path.split('/');
            let current = root;

            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];

                if (!current[part]) {
                    current[part] = {
                        name: part,
                        type: i === parts.length - 1 ? 'file' : 'directory',
                        children: i === parts.length - 1 ? undefined : {},
                    };
                }

                if (i < parts.length - 1) {
                    current = current[part].children!;
                }
            }
        }

        const convert = (node: Record<string, any>): FileTreeNode[] =>
            Object.values(node).map((n: any) => ({
                name: n.name,
                type: n.type,
                children: n.children ? convert(n.children) : undefined,
            }));

        return convert(root);
    }
}
