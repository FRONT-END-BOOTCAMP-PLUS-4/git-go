export class SaveReposDto {
    constructor(
        public userId: string,
        public repoIds: string[],
        public force: boolean = false
    ) {}
}
