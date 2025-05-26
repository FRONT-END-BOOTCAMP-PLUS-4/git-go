import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { GbStatsRepository } from "@/infra/repositories/github/GbStatsRepository";
import { PrRepoRepository } from "@/infra/repositories/prisma/PrRepoRepository";
import { FetchTopActiveReposUsecase } from "@/application/usecase/github/FetchTopActiveReposUsecase";

export async function GET(req: NextRequest) {
    const token = await getToken({ req });
    if (!token?.id || !token?.accessToken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const usecase = new FetchTopActiveReposUsecase(
        new PrRepoRepository(),
        new GbStatsRepository(token.accessToken)
    );

    const result = await usecase.execute(token.id);
    return NextResponse.json(result);
}