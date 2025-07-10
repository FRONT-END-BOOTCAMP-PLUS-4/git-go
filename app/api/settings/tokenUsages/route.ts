import { NextRequest, NextResponse } from "next/server";
import { PrUserRepository } from "@/infra/repositories/prisma/PrUserRepository";
import { UpdateTokenUsageUsecase } from "@/application/usecase/user/UpdateTokenUsageUsecase";

export async function POST(req: NextRequest) {
    try {
        const { userId, tokenUsage } = await req.json();

        if (
            typeof userId !== "string" ||
            typeof tokenUsage !== "number" ||
            tokenUsage < 0
        ) {
            return NextResponse.json(
                { message: "Invalid input" },
                { status: 400 }
            );
        }

        const repository = new PrUserRepository();
        const usecase = new UpdateTokenUsageUsecase(repository);
        await usecase.execute({ userId, tokenUsage });

        return NextResponse.json({ message: "Token usage updated" });
    } catch (error) {
        return NextResponse.json(
            { message: (error as Error).message },
            { status: 500 }
        );
    }
}
