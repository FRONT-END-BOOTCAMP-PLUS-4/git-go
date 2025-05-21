import { Prisma } from "@/prisma/generated/prisma";

type MemoirWithRelations = Prisma.MemoirGetPayload<{
    include: { type: true; repo: true; tags: { include: { tag: true } } };
}>;

export class MemoirListDto {
    id: number;
    title: string;
    type: string;
    tags: string[];
    repoName: string | null;
    updatedAt: Date | null;

    constructor(memoir: MemoirWithRelations) {
        this.id = memoir.id;
        this.title = memoir.title;
        this.type = memoir.type.type;
        this.tags = memoir.tags.map((t) => t.tag.name);
        this.repoName = memoir.repo.name;
        this.updatedAt = memoir.updatedAt;
    }
}