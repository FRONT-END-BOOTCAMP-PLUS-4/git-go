import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { FindUserReposUsecase } from "@/application/usecase/repo/FindUserReposUsecase";
import { PrRepoRepository } from "@/infra/repositories/prisma/PrRepoRepository";

export async function GET(req: NextRequest) {
    const token = await getToken({ req });
    if (!token?.id)
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const usecase = new FindUserReposUsecase(new PrRepoRepository());
    const repos = await usecase.execute(token.id);

    return NextResponse.json(repos);
}
