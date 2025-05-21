import { MemoirRepository } from "@/domain/repositories/MemoirRepository";
import { Memoir, PrismaClient } from "@/prisma/generated/prisma";

const prisma = new PrismaClient();

export class PrMemoirRepository implements MemoirRepository {
    async countByRepoName(name: string): Promise<number> {
        return await prisma.memoir.count({
            where: {
                repo: {
                    name,
                },
            },
        });
    }

    async create(data: {
        title: string;
        content: string;
        source: string;
        userId: string;
        repoId: number;
        typeId: number;
        aiSum?: string;
        tags?: string[];
    }): Promise<Memoir> {
        return prisma.$transaction(async (tx) => {
            const {
                title,
                content,
                source,
                userId,
                repoId,
                typeId,
                aiSum,
                tags,
            } = data;
            // 1) Memoir 레코드 생성
            const memoir = await tx.memoir.create({
                data: {
                    title,
                    content,
                    source,
                    userId,
                    repoId,
                    typeId,
                    aiSum,
                },
            });

            // 2) tags 배열이 있을 때만 처리
            if (tags && tags.length > 0) {
                const tagNames = tags;

                // 2-1) 기존 태그 조회
                const existingTags = await tx.tag.findMany({
                    where: { name: { in: tagNames } },
                });
                const existingTagNames = existingTags.map((t) => t.name);
                const existingTagMap = new Map(
                    existingTags.map((t) => [t.name, t.id])
                );

                // 2-2) 새 태그 생성
                const newTagNames = tagNames.filter(
                    (n) => !existingTagNames.includes(n)
                );
                const createdTags = await Promise.all(
                    newTagNames.map((name) => tx.tag.create({ data: { name } }))
                );
                const createdTagMap = new Map(
                    createdTags.map((t) => [t.name, t.id])
                );

                // 2-3) 최종 tagId 목록 구성
                const tagIds = tagNames.map(
                    (name) =>
                        existingTagMap.get(name) ?? createdTagMap.get(name)!
                );

                // 2-4) 중간 테이블에 연결
                await Promise.all(
                    tagIds.map((tagId) =>
                        tx.memoirTag.create({
                            data: { memoirId: memoir.id, tagId },
                        })
                    )
                );
            }

            return memoir;
        });
    }

    async findByMemoirId(id: number): Promise<Memoir> {
        const memoir = await prisma.memoir.findUnique({
            where: { id },
            include: {
                tags: {
                    select: {
                        tag: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        if (!memoir) {
            throw new Error(`Memoir with id ${id} not found.`);
        }

        const result = {
            ...memoir,
            tags: memoir.tags.map((t) => t.tag.name),
        };

        return result;
    }
}
