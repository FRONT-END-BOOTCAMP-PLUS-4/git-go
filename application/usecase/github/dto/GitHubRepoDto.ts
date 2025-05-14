export class GitHubRepoDto {
    constructor(
        public id: string,
        public name: string,
        public nameWithOwner: string,
        public url: string,
        public isPrivate: boolean,
        public description: string | null,
        public updatedAt: string,
        public stargazerCount: number,
        public languageName?: string,
        public languageColor?: string
    ) { }
}