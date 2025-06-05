import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { GbStatsRepository } from "@/infra/repositories/github/GbStatsRepository";
import { FetchWeeklyCommitsDto } from "@/application/usecase/github/dto/FetchWeeklyCommitsDto";
import { FetchWeeklyCommitsUsecase } from "@/application/usecase/github/FetchWeeklyCommitsUsecase";

export async function GET(req: NextRequest) {
    const token = await getToken({ req });
    const repo = req.nextUrl.searchParams.get("repo");

    if (!token?.accessToken || !repo) {
        return NextResponse.json(
            { message: "Unauthorized or invalid" },
            { status: 401 }
        );
    }

    const usecase = new FetchWeeklyCommitsUsecase(
        new GbStatsRepository(token.accessToken)
    );
    const result = await usecase.execute(new FetchWeeklyCommitsDto(repo));

    return NextResponse.json(result);
}
