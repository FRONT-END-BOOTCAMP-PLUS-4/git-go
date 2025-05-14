import { NextRequest, NextResponse } from "next/server";
import { FetchFromGithub } from "@/infra/repositories/github/GbRepoRepository";
import { FetchRepos } from "@/application/usecase/github/FetchRepos";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
    const token = await getToken({ req });
    const githubToken = token?.accessToken;

    if (!githubToken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const repo = new FetchFromGithub();
    const usecase = new FetchRepos(repo);
    const repos = await usecase.execute(githubToken);

    return NextResponse.json(repos);
}