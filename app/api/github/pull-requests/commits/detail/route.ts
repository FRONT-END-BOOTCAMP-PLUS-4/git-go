import { FetchPrCommitDetailUsecase } from "@/application/usecase/github/FetchPrCommitDetailUsecase";
import { GbPrCommitDetailRepository } from "@/infra/repositories/github/GbPrCommitDetailRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { nameWithOwner, sha, accessToken } = await req.json(); // ✅ accessToken 추출

        if (
            !nameWithOwner ||
            !sha ||
            !accessToken || // ✅ accessToken 유효성 체크
            typeof nameWithOwner !== "string" ||
            typeof sha !== "string" ||
            typeof accessToken !== "string"
        ) {
            return NextResponse.json(
                { message: "Invalid parameters" },
                { status: 400 }
            );
        }

        const repository = new GbPrCommitDetailRepository();
        const usecase = new FetchPrCommitDetailUsecase(repository);
        const result = await usecase.execute({
            nameWithOwner,
            sha,
            accessToken,
        });

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
        { message: "Method GET Not Allowed" },
        { status: 405 }
    );
}

export function PUT() {
    return NextResponse.json(
        { message: "Method PUT Not Allowed" },
        { status: 405 }
    );
}
