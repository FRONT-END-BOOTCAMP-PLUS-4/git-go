import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { PrLoginRecordRepository } from "@/infra/repositories/prisma/PrLoginRecordRepository";
import { AutoLoginRecordUsecase } from "@/application/usecase/login-record/AutoLoginRecordUsecase";
import { AutoLoginRecordDto } from "@/application/usecase/login-record/dto/AutoLoginRecordDto";

export async function POST(req: NextRequest) {
    const token = await getToken({ req });
    if (!token?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const usecase = new AutoLoginRecordUsecase(new PrLoginRecordRepository());
    await usecase.execute(new AutoLoginRecordDto(token.id));

    return NextResponse.json({ success: true });
}
