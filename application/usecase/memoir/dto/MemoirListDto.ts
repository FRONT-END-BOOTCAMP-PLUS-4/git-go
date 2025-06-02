import { Prisma } from "@/prisma/generated/prisma";

type MemoirWithRelations = Prisma.MemoirGetPayload<{
    include: { type: true; repo: true; tags: { include: { tag: true } } };
}>;

export class MemoirListDto {
    id: number;
    title: string;
    content: Prisma.JsonValue;
    source: string;
    sourceTitle: string;
    aiSum: string | null;
    type: string;
    tags: string[];
    repoId: string | null;
    repoName: string | null;
    createdAt: Date;
    updatedAt: Date | null;

    constructor(memoir: MemoirWithRelations) {
        this.id = memoir.id;
        this.title = memoir.title;
        this.content = memoir.content;
        this.source = memoir.source;
        this.sourceTitle = memoir.sourceTitle;
        this.aiSum = memoir.aiSum;
        this.type = memoir.type.type;
        this.tags = memoir.tags.map((t) => t.tag.name);
        this.repoId = memoir.repo.name;
        this.repoName = null;
        this.createdAt = memoir.createdAt;
        this.updatedAt = memoir.updatedAt;
    }
}
