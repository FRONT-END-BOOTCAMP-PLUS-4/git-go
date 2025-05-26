import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { FetchCommitStatsUsecase } from "@/application/usecase/github/FetchCommitStatsUsecase";
import { FetchCommitStatsDto } from "@/application/usecase/github/dto/FetchCommitStatsDto";
import { GbStatsRepository } from "@/infra/repositories/github/GbStatsRepository";

export async function GET(req: NextRequest) {
    const token = await getToken({ req });
    if (!token?.accessToken) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const repo = req.nextUrl.searchParams.get("repo");
    if (!repo) return NextResponse.json({ message: "Missing repo" }, { status: 400 });

    const usecase = new FetchCommitStatsUsecase(new GbStatsRepository(token.accessToken));
    const result = await usecase.execute(new FetchCommitStatsDto(repo));

    return NextResponse.json(result);
}