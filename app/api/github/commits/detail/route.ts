import { NextRequest, NextResponse } from 'next/server';
import { FetchCommitDetailUsecase } from '@/application/usecase/github/FetchCommitDetailUsecase';
import { GbCommitDetailRepository } from '@/infra/repositories/github/GbCommitDetailRepository';

export async function POST(req: NextRequest) {
    try {
        const { nameWithOwner, sha } = await req.json();

        if (
            !nameWithOwner ||
            !sha ||
            typeof nameWithOwner !== 'string' ||
            typeof sha !== 'string'
        ) {
            return NextResponse.json(
                { message: 'Invalid parameters' },
                { status: 400 }
            );
        }

        const repository = new GbCommitDetailRepository();
        const usecase = new FetchCommitDetailUsecase(repository);
        const result = await usecase.execute({ nameWithOwner, sha });

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { message: (error as Error).message },
            { status: 500 }
        );
    }
}

export function GET() {
    return NextResponse.json(
        { message: 'Method GET Not Allowed' },
        { status: 405 }
    );
}

export function PUT() {
    return NextResponse.json(
        { message: 'Method PUT Not Allowed' },
        { status: 405 }
    );
}

// 필요하다면 DELETE, PATCH 등도 같은 패턴으로 처리 가능
