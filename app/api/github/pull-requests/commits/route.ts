import { NextRequest, NextResponse } from "next/server";
import { FetchPrCommitListUsecase } from "@/application/usecase/github/FetchPrCommitListUsecase";
import { GbPrCommitListRepository } from "@/infra/repositories/github/GbPrCommitListRepository";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { accessToken, githubUsername, repoFullName, prNumber, branchName } = body;

  if (
    !accessToken ||
    !githubUsername ||
    !repoFullName ||
    typeof prNumber !== "number" ||
    !branchName
  ) {
    return NextResponse.json({ message: "Invalid parameters" }, { status: 400 });
  }

  try {
    const repository = new GbPrCommitListRepository(accessToken);
    const usecase = new FetchPrCommitListUsecase(repository);
    const commitList = await usecase.fetchByPullRequestNumber(repoFullName, prNumber);

    return NextResponse.json({ commitList });
  } catch (error) {
    console.error("Error fetching PR commits:", error);
    return NextResponse.json({ message: "Failed to fetch PR commits" }, { status: 500 });
  }
}
