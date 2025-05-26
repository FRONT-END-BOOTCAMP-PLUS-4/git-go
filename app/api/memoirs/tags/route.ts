import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { PrMemoirRepository } from "@/infra/repositories/prisma/PrMemoirRepository";
import { GetMemoirTagsUsecase } from "@/application/usecase/memoir/GetMemoirTagsUsecase";

export async function GET(req: NextRequest) {
    const token = await getToken({ req });
    if (!token?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const repoId = searchParams.get("repo") ?? undefined;

    const usecase = new GetMemoirTagsUsecase(new PrMemoirRepository());
    const result = await usecase.execute(token.id, repoId);
    return NextResponse.json(result);
}
