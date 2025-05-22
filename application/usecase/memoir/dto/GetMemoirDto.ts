import { Value } from "@udecode/plate";

export class GetMemoirResponseDto {
    constructor(
        public title: string,
        public content: Value,
        public source: string,
        public userId: string,
        public typeId: number,
        public repoId: number,
        public aiSum?: string,
        public tags?: string[]
    ) {}
}
