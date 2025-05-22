import { FetchPullRequestListUsecase } from '@/application/usecase/github/FetchPullRequestListUsecase';
import { GbPullRequestRepository } from '@/infra/repositories/github/GbPullRequestRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const raw = await req.text();
        console.log('Raw body:', raw);

        const { repoFullName, author, token, page = 1, perPage = 10 } = JSON.parse(raw);

        if (!repoFullName || !author || !token) {
            return NextResponse.json(
                { error: 'Missing required parameters: repoFullName, author, or token' },
                { status: 400 }
            );
        }

        const pageNum = Number(page) || 1;
        const perPageNum = Number(perPage) || 10;

        const repository = new GbPullRequestRepository(token);
        const usecase = new FetchPullRequestListUsecase(repository);

        // 인자 순서: repoFullName, author, page, perPage
        const result = await usecase.execute(repoFullName, author, pageNum, perPageNum);

        return NextResponse.json(result);
    } catch (err: any) {
        console.error('Failed to fetch PRs:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
