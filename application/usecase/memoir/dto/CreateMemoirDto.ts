export class CreateMemoirRequestDto {
    constructor(
        public title: string,
        public content: string,
        public source: string,
        public userId: string,
        public typeId: number,
        public repoId: number,
        public aiSum?: string,
        public tags?: string[]
    ) {}
}
