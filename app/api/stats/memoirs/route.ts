import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { FetchMemoirCount } from "@/application/usecase/memoir/FetchMemoirCount";
import { FetchMemoirCountDto } from "@/application/usecase/memoir/dto/FetchMemoirCountDto";
import { PrMemoirRepository } from "@/infra/repositories/prisma/PrMemoirRepository";

export async function GET(req: NextRequest) {
    const token = await getToken({ req });
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const repoId = req.nextUrl.searchParams.get("repo");
    if (!repoId) return NextResponse.json({ message: "Missing repoId" }, { status: 400 });

    const usecase = new FetchMemoirCount(new PrMemoirRepository());
    const count = await usecase.execute(new FetchMemoirCountDto(repoId));

    return NextResponse.json({ totalMemoirs: count });
}