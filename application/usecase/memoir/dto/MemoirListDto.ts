import { Prisma } from "@/prisma/generated/prisma";

type MemoirWithRelations = Prisma.MemoirGetPayload<{
    include: { type: true; repo: true; tags: { include: { tag: true } } };
}>;

export class MemoirListDto {
    id: number;
    title: string;
    content: string;
    source: string;
    aiSum: string | null;
    type: string;
    tags: string[];
    repoName: string | null;
    createdAt: Date;
    updatedAt: Date | null;

    constructor(memoir: MemoirWithRelations) {
        this.id = memoir.id;
        this.title = memoir.title;
        this.content = memoir.content;
        this.source = memoir.source;
        this.aiSum = memoir.aiSum;
        this.type = memoir.type.type;
        this.tags = memoir.tags.map((t) => t.tag.name);
        this.repoName = memoir.repo.name;
        this.createdAt = memoir.createdAt;
        this.updatedAt = memoir.updatedAt;
    }
}