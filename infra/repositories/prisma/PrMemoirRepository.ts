import { MemoirRepository } from "@/domain/repositories/MemoirRepository";
import { Memoir, PrismaClient } from "@/prisma/generated/prisma";

const prisma = new PrismaClient();

export class PrMemoirRepository implements MemoirRepository {
    async findByUserId(userId: string, repoName?: string) {
        const repoFilter: { repoId?: number } = {};
        if (repoName) {
            const repo = await prisma.repo.findFirst({
                where: {
                    name: repoName,
                    userId,
                },
            });
            if (!repo) return [];
            repoFilter.repoId = repo.id;
        }

        return prisma.memoir.findMany({
            where: {
                userId,
                ...repoFilter,
            },
            include: {
                type: true,
                repo: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });
    }

    async findByUserIdPaginated(
        userId: string,
        repoName?: string,
        page = 1,
        perPage = 10,
        createdAfter?: Date,
        filterType: "commits" | "pullRequests" | "all" = "all",
        tags?: string[],
        searchKeyword?: string
    ): Promise<[any[], number]> {
        const skip = (page - 1) * perPage;

        const repoFilter: { repoId?: number } = {};
        if (repoName) {
            const repo = await prisma.repo.findFirst({
                where: { name: repoName, userId },
            });
            if (!repo) return [[], 0];
            repoFilter.repoId = repo.id;
        }

        const where: Record<string, any> = {
            userId,
            ...repoFilter,
        };

        if (createdAfter) {
            where.createdAt = { gte: createdAfter };
        }

        if (filterType === "commits") where.typeId = 1;
        else if (filterType === "pullRequests") where.typeId = 2;

        if (tags && tags.length > 0) {
            where.AND = [
                ...(where.AND ?? []),
                ...tags.map((tag) => ({
                    tags: {
                        some: {
                            tag: {
                                name: tag,
                            },
                        },
                    },
                })),
            ];
        }

        if (searchKeyword) {
            where.title = {
                contains: searchKeyword,
                mode: "insensitive",
            };
        }

        const [memoirs, totalCount] = await Promise.all([
            prisma.memoir.findMany({
                where,
                include: {
                    type: true,
                    repo: true,
                    tags: { include: { tag: true } },
                },
                orderBy: { createdAt: "desc" },
                skip,
                take: perPage,
            }),
            prisma.memoir.count({ where }),
        ]);

        return [memoirs, totalCount];
    }

    async countByRepoName(name: string, userId: string): Promise<number> {
        return await prisma.memoir.count({
            where: {
                userId,
                repo: {
                    name,
                },
            },
        });
    }

    async findAllTagsByUser(
        userId: string,
        repoId?: string
    ): Promise<string[]> {
        const memoirWhere: any = { userId };
        if (repoId) {
            memoirWhere.repoId = Number(repoId);
        }
        const tags = await prisma.memoirTag.findMany({
            where: {
                memoir: {
                    is: memoirWhere,
                },
            },
            include: {
                tag: true,
            },
            distinct: ["tagId"],
        });
        return tags.map((t) => t.tag.name);
    }

    async getMemoirHeatmap(
        userId: string
    ): Promise<{ date: string; count: number }[]> {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        const rawData = await prisma.memoir.groupBy({
            by: ["createdAt"],
            _count: { id: true },
            where: {
                userId,
                createdAt: { gte: oneYearAgo },
            },
        });
        const mergedMap = new Map<string, number>();
        rawData.forEach((d) => {
            const date = d.createdAt.toISOString().split("T")[0];
            const prev = mergedMap.get(date) ?? 0;
            mergedMap.set(date, prev + d._count.id);
        });
        const result = Array.from(mergedMap.entries()).map(([date, count]) => ({
            date,
            count,
        }));
        result.sort((a, b) => (a.date < b.date ? -1 : 1));

        return result;
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
        sourceTitle?: string;
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
                sourceTitle,
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
                    sourceTitle,
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

    async edit(data: {
        title: string;
        content: string;
        tags?: string[];
        memoirId: number;
        aiSum?: string;
    }): Promise<Memoir> {
        return prisma.$transaction(async (tx) => {
            const { memoirId, title, content, tags, aiSum } = data;

            // 1) 기본 필드 업데이트 (updatedAt 필드가 있다면 함께 갱신)
            await tx.memoir.update({
                where: { id: memoirId },
                data: {
                    title,
                    content,
                    aiSum,
                    updatedAt: new Date(),
                },
            });

            if (tags) {
                // 2) 기존 관계 모두 삭제
                await tx.memoirTag.deleteMany({
                    where: { memoirId },
                });

                if (tags.length > 0) {
                    // 3-1) 기존 태그 조회
                    const existingTags = await tx.tag.findMany({
                        where: { name: { in: tags } },
                    });
                    const existingTagNames = existingTags.map((t) => t.name);
                    const existingTagMap = new Map(
                        existingTags.map((t) => [t.name, t.id])
                    );

                    // 3-2) 새로 생성할 태그 이름만 필터링
                    const newTagNames = tags.filter(
                        (n) => !existingTagNames.includes(n)
                    );
                    const createdTags = await Promise.all(
                        newTagNames.map((name) =>
                            tx.tag.create({ data: { name } })
                        )
                    );
                    const createdTagMap = new Map(
                        createdTags.map((t) => [t.name, t.id])
                    );

                    // 3-3) 최종 tagId 목록 구성
                    const tagIds = tags.map(
                        (name) =>
                            existingTagMap.get(name) ?? createdTagMap.get(name)!
                    );

                    // 3-4) memoirTag 연결 테이블에 새로 삽입
                    await Promise.all(
                        tagIds.map((tagId) =>
                            tx.memoirTag.create({
                                data: { memoirId, tagId },
                            })
                        )
                    );
                }
            }

            // 4) 최종 결과 조회 (tags 포함)
            const updated = await tx.memoir.findUnique({
                where: { id: memoirId },
                include: {
                    tags: {
                        select: {
                            tag: {
                                select: { id: true, name: true },
                            },
                        },
                    },
                },
            });

            if (!updated) {
                throw new Error(
                    `Memoir with id ${memoirId} not found after update.`
                );
            }

            // 5) domain 모델에 맞게 tags 배열으로 변환
            return {
                ...updated,
                tags: updated.tags.map((t) => t.tag.name),
            };
        });
    }

    async delete(id: number): Promise<null> {
        return prisma.$transaction(async (tx) => {
            // 1) 중간 테이블(memoirTag)의 연결 관계 먼저 삭제
            await tx.memoirTag.deleteMany({
                where: { memoirId: id },
            });

            // 2) memoir 레코드 자체 삭제
            await tx.memoir.delete({
                where: { id },
            });

            return null;
        });
    }
}
