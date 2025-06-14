"use client";

import { useRouter } from "next/navigation";

type ErrorProps = {
    errorMessage: string;
};

export default function Error({ errorMessage }: ErrorProps) {
    const router = useRouter();
    return (
        <div className="bg-bg-primary1 mt-16 flex flex-col items-center justify-center text-center">
            <p className="text-danger1 text-xl">{errorMessage}</p>

            <button
                onClick={() => router.back()}
                className="bg-bg-primary2 hover:bg-hover-primary1 text-text-primary1 rounded-md p-3 hover:cursor-pointer"
            >
                이전 화면으로 돌아가기
            </button>
        </div>
    );
}
