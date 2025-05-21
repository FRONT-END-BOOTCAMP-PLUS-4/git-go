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

    const repository = new GbPullRequestRepository(token);
    const usecase = new FetchPullRequestListUsecase(repository);

    // REST 기반이라 afterCursor 대신 page 전달
    const result = await usecase.execute(repoFullName, author, perPage, page);

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Failed to fetch PRs:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
