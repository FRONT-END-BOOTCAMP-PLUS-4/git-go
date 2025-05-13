export class SaveReposDto {
    constructor(
        public userId: string,
        public repoIds: string[]
    ) { }
}