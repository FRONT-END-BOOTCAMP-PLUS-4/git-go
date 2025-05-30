// app/api/s3/upload/route.ts
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

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
