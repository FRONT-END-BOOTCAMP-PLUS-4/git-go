import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { SaveRepos } from "@/application/usecase/repo/SaveRepos";
import { SaveReposDto } from "@/application/usecase/repo/dto/SaveReposDto";
import { PrRepoRepository } from "@/infra/repositories/prisma/PrRepoRepository";

export async function POST(req: NextRequest) {
    const token = await getToken({ req });
    if (!token?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const { repoIds, force } = await req.json();
    const usecase = new SaveRepos(new PrRepoRepository());

    try {
        await usecase.execute(new SaveReposDto(token.id, repoIds, force));
        return NextResponse.json({ message: "Repos saved" });
    } catch (e) {
        return new NextResponse((e as Error).message, { status: 400 });
    }
}