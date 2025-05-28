import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { PrUserRepository } from "@/infra/repositories/prisma/PrUserRepository";
import { CommitSettingUserUsecase } from "@/application/usecase/user/CommitSettingUserUsecase";
import { GetCommitSettingUsecase } from "@/application/usecase/user/GetCommitSettingUsecase";

export async function GET(req: NextRequest) {
    const token = await getToken({ req });
    if (!token?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const usecase = new GetCommitSettingUsecase(new PrUserRepository());
    const isDefaultOnly = await usecase.execute(token.id);
    return NextResponse.json({ isDefaultOnly });
}

export async function POST(req: NextRequest) {
    const token = await getToken({ req });
    if (!token?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { isDefaultOnly } = body;

    const usecase = new CommitSettingUserUsecase(new PrUserRepository());
    await usecase.execute(token.id, isDefaultOnly);

    return NextResponse.json({ message: "설정이 저장되었습니다." });
}
