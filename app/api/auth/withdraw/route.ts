import { NextRequest, NextResponse } from "next/server";
import { PrUserRepository } from "@/infra/repositories/prisma/PrUserRepository";
import { WithdrawUserUsecase } from "@/application/usecase/user/WithdrawUserUsecase";
import { getToken } from "next-auth/jwt";

export async function PATCH(req: NextRequest) {
    const token = await getToken({ req });
    if (!token?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const repo = new PrUserRepository();
    const usecase = new WithdrawUserUsecase(repo);
    await usecase.execute(token.id);

    return NextResponse.json({ message: "withdrawn" });
}
