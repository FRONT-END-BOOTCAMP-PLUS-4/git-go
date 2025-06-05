export class GithubRepo {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly nameWithOwner: string,
        public readonly url: string,
        public readonly isPrivate: boolean,
        public readonly description: string | null,
        public readonly updatedAt: Date,
        public readonly stargazerCount: number,
        public readonly languageName?: string,
        public readonly languageColor?: string
    ) {}
}
