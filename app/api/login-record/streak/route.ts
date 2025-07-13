import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { GetLoginStreakUsecase } from "@/application/usecase/login-record/GetLoginStreakUsecase";
import { GetLoginStreakDto } from "@/application/usecase/login-record/dto/GetLoginStreakDto";
import { PrLoginRecordRepository } from "@/infra/repositories/prisma/PrLoginRecordRepository";

export async function GET(req: NextRequest) {
    const token = await getToken({ req });
    if (!token?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const usecase = new GetLoginStreakUsecase(new PrLoginRecordRepository());
    const result = await usecase.execute(new GetLoginStreakDto(token.id));

    return NextResponse.json(result);
}
