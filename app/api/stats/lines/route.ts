import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { GbStatsRepository } from "@/infra/repositories/github/GbStatsRepository";
import { FetchLinesStats } from "@/application/usecase/github/FetchLinesStats";

export async function GET(req: NextRequest) {
    const token = await getToken({ req });
    const githubToken = token?.accessToken;
    if (!githubToken) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const repo = req.nextUrl.searchParams.get("repo");
    if (!repo) return NextResponse.json({ message: "Missing repo param" }, { status: 400 });

    const usecase = new FetchLinesStats(new GbStatsRepository(githubToken));
    const result = await usecase.execute(repo);

    return NextResponse.json(result);
}