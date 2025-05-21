import { GetMemoirUsecase } from "@/application/usecase/memoir/GetMemoirUsecase";
import { PrMemoirRepository } from "@/infra/repositories/prisma/PrMemoirRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;
        const memoirId = Number(id);

        const repo = new PrMemoirRepository();
        const usecase = new GetMemoirUsecase(repo);
        const memoir = await usecase.execute(memoirId);

        return NextResponse.json(memoir, { status: 201 });
    } catch (err) {
        console.error("❌ Error in POST /api/memoir/[memoirId]:", err);
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
