import { DeleteMemoirUsecase } from "@/application/usecase/memoir/DeleteMemoirUsecase";
import { EditMemoirUsecase } from "@/application/usecase/memoir/EditMemoirUsecase";
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
        console.error("❌ Error in POST /api/memoirs/[memoirId]:", err);
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

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const payload = await req.json();
        const { id } = await params;
        const memoirId = Number(id);

        const dto = { ...payload, memoirId };

        const repo = new PrMemoirRepository();
        const usecase = new EditMemoirUsecase(repo);
        const updated = await usecase.execute(dto);
        console.log("updated: ", updated);

        return NextResponse.json(updated, { status: 201 });
    } catch (err) {
        console.error("❌ Error in PUT /api/memoirs/[memoirId]:", err);
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

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;
        const memoirId = Number(id);

        const repo = new PrMemoirRepository();
        const usecase = new DeleteMemoirUsecase(repo);
        const deleted = await usecase.execute(memoirId);
        console.log("deleted: ", deleted);

        return NextResponse.json(
            { message: "삭제가 완료되었습니다." },
            { status: 200 }
        );
    } catch (err) {
        console.error("❌ Error in DELETE /api/memoirs/[memoirId]:", err);
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
