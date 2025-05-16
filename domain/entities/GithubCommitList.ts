export class GithubCommit {
  constructor(
    public sha: string,
    public message: string,
    public branch: string,
    public repo: string,
    public type: string,
    public createdAt: Date
  ) { }

  static fromJson(json: any): GithubCommit {
    const message = json.commit.message;
    const sha = json.sha;
    const createdAt = new Date(json.commit.author.date);
    const repo = json.url.split('/repos/')[1].split('/')[1];
    const branch = json.branch || '';
    const type = extractCommitType(message); // 예: "bugfix", "feat"
    return new GithubCommit(sha, message, branch, repo, type, createdAt);
  }
}

function extractCommitType(message: string): string {
  const match = message.match(/(?:^|\s)(feat|fix|chore|merge|refactor|test|docs)(?=\(|:|\s)/i);
  return match ? match[1].toLowerCase() : "etc";
}
