export class EditMemoirRequestDto {
    constructor(
        public title: string,
        public content: string,
        public memoirId: number,
        public tags?: string[]
    ) {}
}
