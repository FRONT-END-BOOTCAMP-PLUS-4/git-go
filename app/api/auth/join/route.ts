import { NextRequest, NextResponse } from "next/server";
import { PrUserRepository } from "@/infra/repositories/prisma/PrUserRepository";
import { JoinUser } from "@/application/usecase/user/JoinUser";

export async function POST(req: NextRequest) {
    const { githubId, username, profileUrl } = await req.json();

    const repo = new PrUserRepository();
    const usecase = new JoinUser(repo);
    const user = await usecase.execute({ githubId, username, profileUrl });

    return NextResponse.json(user);
}