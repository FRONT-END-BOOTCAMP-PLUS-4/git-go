import { MemoirRepository } from "@/domain/repositories/MemoirRepository";
import { extractImageUrlsFromContent, urlToS3Key } from "@/lib/plate-utils";
import { s3 } from "@/lib/s3-client";
import { Memoir } from "@/prisma/generated/prisma";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export class DeleteMemoirUsecase {
    constructor(private memoirRepository: MemoirRepository) {}

    async execute(id: number): Promise<void> {
        // DB에서 회고 조회
        const memoir: Memoir | null =
            await this.memoirRepository.findByMemoirId(id);
        if (!memoir) {
            console.error(
                "[DeleteUsecase] 해당 ID로 회고를 찾을 수 없습니다. id=",
                id
            );
            throw new Error("삭제할 회고를 찾을 수 없습니다.");
        }

        // Plate-Editor JSON 내의 이미지 URL만 뽑기
        let imageUrls: string[] = [];
        try {
            // content가 String이면 파싱, Json 타입이면 그대로
            const parsedContent =
                typeof memoir.content === "string"
                    ? JSON.parse(memoir.content)
                    : memoir.content;

            imageUrls = extractImageUrlsFromContent(parsedContent);
        } catch (err) {
            console.warn(
                "[DeleteUsecase] Plate-Editor content 파싱 실패 또는 이미지 없음:",
                err
            );
            imageUrls = [];
        }

        // 3) S3에서 이미지 삭제 시도
        const bucketName = process.env.S3_BUCKET!;
        await Promise.all(
            imageUrls.map(async (fullUrl) => {
                const key = urlToS3Key(fullUrl);
                console.log(`[DeleteUsecase] URL → S3 Key 변환 결과: ${key}`);

                if (!key) {
                    console.warn(
                        `[DeleteUsecase] urlToS3Key가 빈 문자열을 리턴했습니다. fullUrl=${fullUrl}`
                    );
                    return;
                }

                try {
                    const command = new DeleteObjectCommand({
                        Bucket: bucketName,
                        Key: key,
                    });
                    const result = await s3.send(command);
                    // AWS SDK v3은 deleteObject 결과를 주로 빈 객체로 반환하지만,
                    // IAM 권한/존재하지 않는 key 에러 등은 여기서 catch로 빠집니다.
                    console.log(
                        `[DeleteUsecase] S3 삭제 요청 성공: key=${key}, result=`,
                        result
                    );
                } catch (s3Err) {
                    console.error(
                        `[DeleteUsecase] S3 이미지 삭제 실패 (key="${key}")`,
                        s3Err
                    );
                }
            })
        );

        await this.memoirRepository.delete(id);
    }
}
