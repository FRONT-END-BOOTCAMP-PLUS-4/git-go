import { NextRequest, NextResponse } from "next/server";
import { FetchFromGithub } from "@/infra/repositories/github/GbRepoRepository";
import { FetchReposUsecase } from "@/application/usecase/github/FetchReposUsecase";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
    const token = await getToken({ req });
    const githubToken = token?.accessToken;

    if (!githubToken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const repo = new FetchFromGithub();
    const usecase = new FetchReposUsecase(repo);
    const repos = await usecase.execute(githubToken);

    return NextResponse.json(repos);
}
