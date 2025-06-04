import { s3 } from "@/lib/s3-client";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(request: Request) {
    const formData = await request.formData();
    const fileList = formData.getAll("files") as File[];

    if (!fileList.length) {
        return NextResponse.json(
            { error: "No files provided" },
            { status: 400 }
        );
    }

    const uploadPromises = fileList.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const ext = file.name.split(".").pop();
        const key = `uploads/${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 8)}.${ext}`;
        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: key,
            Body: buffer,
            ContentType: file.type || "application/octet-stream",
        });

        await s3.send(command);
        return `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    });

    try {
        const urls = await Promise.all(uploadPromises);
        return NextResponse.json({ urls });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.error("S3 upload error:", err);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        // 쿼리 스트링에서 key를 꺼냅니다. ex) /api/images?key=uploads/12345-abcd.png
        const { searchParams } = new URL(req.url);
        const key = searchParams.get("key");

        if (!key) {
            return NextResponse.json(
                { message: "key 파라미터가 필요합니다." },
                { status: 400 }
            );
        }

        const bucketName = process.env.S3_BUCKET!;
        await s3.send(
            new DeleteObjectCommand({
                Bucket: bucketName,
                Key: key,
            })
        );

        return NextResponse.json(
            { message: "이미지 삭제 완료" },
            { status: 200 }
        );
    } catch (err) {
        console.error("❌ DELETE /api/images 에러:", err);
        return NextResponse.json(
            {
                message:
                    err instanceof Error
                        ? err.message
                        : "S3 삭제 중 오류가 발생했습니다.",
            },
            { status: 500 }
        );
    }
}
