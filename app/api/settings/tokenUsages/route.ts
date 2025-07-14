import { NextRequest, NextResponse } from "next/server";
import { PrUserRepository } from "@/infra/repositories/prisma/PrUserRepository";
import { UpdateTokenUsageUsecase } from "@/application/usecase/user/UpdateTokenUsageUsecase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
        return new Response("Unauthorized", { status: 401 });
    }

    const repository = new PrUserRepository();
    const result = await repository.getTokenUsage({ userId: session.user.id });

    return Response.json(result); // { daily_ai_use_count, daily_ai_restrict_count }
}

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
        const updated = await usecase.execute({ userId, tokenUsage });

        return NextResponse.json({
            message: "Token usage updated",
            usage: updated.usage,
            restrictUsage: updated.restrictUsage,
        });
    } catch (error) {
        return NextResponse.json(
            { message: (error as Error).message },
            { status: 500 }
        );
    }
}
