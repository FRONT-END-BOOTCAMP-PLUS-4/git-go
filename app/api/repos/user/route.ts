import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { FindUserRepos } from "@/application/usecase/repo/FindUserRepos";
import { PrRepoRepository } from "@/infra/repositories/prisma/PrRepoRepository";

export async function GET(req: NextRequest) {
    const token = await getToken({ req });
    if (!token?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const usecase = new FindUserRepos(new PrRepoRepository());
    const repos = await usecase.execute(token.id);

    return NextResponse.json(repos);
}