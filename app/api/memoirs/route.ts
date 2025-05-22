import { CreateMemoirUsecase } from "@/application/usecase/memoir/CreateMemoirUsecase";
import { GetMyMemoirsUsecase } from "@/application/usecase/memoir/GetMyMemoirsUsecase";
import { PrMemoirRepository } from "@/infra/repositories/prisma/PrMemoirRepository";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const token = await getToken({ req });
    if (!token?.id)
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const repoId = searchParams.get("repo");
    const usecase = new GetMyMemoirsUsecase(new PrMemoirRepository());

    const memoirs = await usecase.execute(token.id, repoId as string);
    return NextResponse.json(memoirs);
}

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();

        const repo = new PrMemoirRepository();
        const usecase = new CreateMemoirUsecase(repo);
        const memoir = await usecase.execute(payload);

        return NextResponse.json(memoir, { status: 201 });
    } catch (err) {
        console.error("❌ Error in POST /api/memoirs:", err);
        return NextResponse.json(
            {
                message:
                    err instanceof Error
                        ? err.message
                        : "Internal Server Error 입니다.",
            },
            { status: 500 }
        );
    }
}
