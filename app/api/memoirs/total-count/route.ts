import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { PrMemoirRepository } from "@/infra/repositories/prisma/PrMemoirRepository";
import { GetMemoirTotalCountUsecase } from "@/application/usecase/memoir/GetMemoirTotalCountUsecase";

export async function GET(req: NextRequest) {
    const token = await getToken({ req });
    if (!token?.id)
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const usecase = new GetMemoirTotalCountUsecase(new PrMemoirRepository());
    const result = await usecase.execute({ userId: token.id });

    return NextResponse.json(result);
}
