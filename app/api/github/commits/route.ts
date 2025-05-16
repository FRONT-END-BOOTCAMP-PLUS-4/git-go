import { FetchCommitList } from "@/application/usecase/github/FetchCommitList";
import { GbCommitListRepository } from "@/infra/repositories/github/GbCommitListRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const owner = body.owner;
    const repo = body.repo;
    const author = body.author;
    const accessToken = body.token;

    if (!owner || !repo || !author) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const repository = new GbCommitListRepository();
    const usecase = new FetchCommitList(repository);
    const commitList = await usecase.execute({
      owner,
      repo,
      author,
      token: accessToken,
    });

    return NextResponse.json(commitList);
  } catch (error) {
    console.error("Fetch commit list failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
