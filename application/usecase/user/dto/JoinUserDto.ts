export class JoinUserDto {
    constructor(
        public githubId: string,
        public username: string,
        public profileUrl?: string
    ) {}
}
