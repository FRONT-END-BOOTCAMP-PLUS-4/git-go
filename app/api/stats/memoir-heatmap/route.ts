import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { GetMemoirHeatmapUsecase } from "@/application/usecase/memoir/GetMemoirHeatmapUsecase";
import { PrMemoirRepository } from "@/infra/repositories/prisma/PrMemoirRepository";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const repo = new PrMemoirRepository();
    const usecase = new GetMemoirHeatmapUsecase(repo);

    const data = await usecase.execute(session.user.id);

    return NextResponse.json(data);
}
