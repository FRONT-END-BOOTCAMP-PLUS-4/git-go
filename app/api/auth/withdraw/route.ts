import { NextRequest, NextResponse } from "next/server";
import { PrUserRepository } from "@/infra/repositories/prisma/PrUserRepository";
import { WithdrawUser } from "@/application/usecase/user/WithdrawUser";
import { getToken } from "next-auth/jwt";

export async function PATCH(req: NextRequest) {
    const token = await getToken({ req });
    if (!token?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const repo = new PrUserRepository();
    const usecase = new WithdrawUser(repo);
    await usecase.execute(token.id);

    return NextResponse.json({ message: "withdrawn" });
}