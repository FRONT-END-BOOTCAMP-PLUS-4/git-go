/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteMemoirUsecase } from "@/application/usecase/memoir/DeleteMemoirUsecase";
import { EditMemoirUsecase } from "@/application/usecase/memoir/EditMemoirUsecase";
import { GetMemoirUsecase } from "@/application/usecase/memoir/GetMemoirUsecase";
import { PrMemoirRepository } from "@/infra/repositories/prisma/PrMemoirRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any) {
    const { id } = context.params;
    const memoirId = Number(id);

    try {
        // 숫자 변환이 실패하거나 NaN이면 곧바로 400으로 응답
        if (isNaN(memoirId)) {
            return NextResponse.json(
                { message: "유효한 id 형식이 아닙니다." },
                { status: 400 }
            );
        }

        const repo = new PrMemoirRepository();
        const usecase = new GetMemoirUsecase(repo);

        // 존재하지 않는 경우 usecase.execute가 null/undefined를 리턴하거나
        // 아니면 내부에서 throw를 던질 수도 있으니, 그에 맞춰 처리
        const memoir = await usecase.execute(memoirId);

        // usecase.execute가 null 또는 undefined를 리턴했다면 404 처리
        if (!memoir) {
            return NextResponse.json(
                { message: "회고록을 찾을 수 없습니다." },
                { status: 404 }
            );
        }

        // 정상
        return NextResponse.json(memoir, { status: 200 });
    } catch (err: any) {
        // 만약 usecase.execute 내부에서 “NotFoundError” 같은 커스텀 예외를 던진다면
        // err.name이나 err.code로 체크해서 404로 던질 수도 있음
        console.error("❌ Error in GET /api/memoirs/[memoirId]:", err);

        // 예: usecase에서 throw new Error("NotFound") 같은 식으로 던졌다면
        if (err.message === "NotFound") {
            return NextResponse.json(
                { message: "회고록을 찾을 수 없습니다." },
                { status: 404 }
            );
        }

        // 그 외 서버 에러
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

export async function PUT(req: NextRequest, context: any) {
    try {
        const payload = await req.json();
        const { id } = await context.params;
        const memoirId = Number(id);

        const dto = { ...payload, memoirId };

        const repo = new PrMemoirRepository();
        const usecase = new EditMemoirUsecase(repo);
        const updated = await usecase.execute(dto);

        return NextResponse.json(updated, { status: 200 });
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

export async function DELETE(req: NextRequest, context: any) {
    try {
        const { id } = await context.params;
        const memoirId = Number(id);

        const repo = new PrMemoirRepository();
        const usecase = new DeleteMemoirUsecase(repo);
        await usecase.execute(memoirId);

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
