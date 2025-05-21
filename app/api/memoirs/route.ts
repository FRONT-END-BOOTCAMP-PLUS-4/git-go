import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { PrMemoirRepository } from "@/infra/repositories/prisma/PrMemoirRepository";
import { GetMyMemoirsUsecase } from "@/application/usecase/memoir/GetMyMemoirsUsecase";

// export async function GET(req: NextRequest) {
//     const token = await getToken({ req });
//     if (!token?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//     const usecase = new GetMyMemoirsUsecase(new PrMemoirRepository());
//     const memoirs = await usecase.execute(token.id);
//     return NextResponse.json(memoirs);
// }

export async function GET(req: NextRequest) {
    const token = await getToken({ req });
    if (!token?.id)
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const repoId = searchParams.get("repo");

    const usecase = new GetMyMemoirsUsecase(new PrMemoirRepository());

    const memoirs = await usecase.execute(token.id, repoId ? Number(repoId) : undefined);
    return NextResponse.json(memoirs);
}