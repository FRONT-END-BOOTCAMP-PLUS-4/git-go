import { CreateMemoirUsecase } from "@/application/usecase/memoir/CreateMemoirUsecase";
import { PrMemoirRepository } from "@/infra/repositories/prisma/PrMemoirRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();

        const repo = new PrMemoirRepository();
        const usecase = new CreateMemoirUsecase(repo);
        const memoir = await usecase.execute(payload);

        console.log("memoir: ", memoir);

        return NextResponse.json(memoir, { status: 201 });
    } catch (err) {
        console.error("❌ Error in POST /api/memoir:", err);
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
