export class ResponseTopActiveReposDto {
    constructor(
        public readonly name: string,
        public readonly commits: number
    ) { }
}