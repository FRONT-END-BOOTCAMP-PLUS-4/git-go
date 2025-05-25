"use client";

import Image from "next/image";

export default function Loading() {
    return (
        <div className="bg-bg-primary1 fixed inset-0 top-[65px] z-10 flex flex-col items-center justify-center">
            <div
                className="h-[100px] w-[100px]"
                style={{
                    animation: "shake 1.2s ease-in-out infinite",
                    transformOrigin: "bottom center",
                }}
            >
                <Image
                    src="/loading.png"
                    alt="로딩 중"
                    width={100}
                    height={100}
                    priority
                />
            </div>
            <p className="sparkle-text relative mt-4 text-sm text-gray-600">
                로딩 중<span className="loading-dots" />
            </p>

            <style jsx>{`
                @keyframes shake {
                    0% {
                        transform: rotate(0deg);
                    }
                    25% {
                        transform: rotate(8deg);
                    }
                    50% {
                        transform: rotate(-8deg);
                    }
                    75% {
                        transform: rotate(5deg);
                    }
                    100% {
                        transform: rotate(0deg);
                    }
                }

                @keyframes dots {
                    0% {
                        content: "";
                    }
                    33% {
                        content: ".";
                    }
                    66% {
                        content: "..";
                    }
                    100% {
                        content: "...";
                    }
                }

                .loading-dots::after {
                    display: inline-block;
                    animation: dots 1s steps(3, end) infinite;
                    content: "";
                    white-space: pre;
                }

                @keyframes sparkle {
                    0%,
                    100% {
                        opacity: 1;
                        filter: brightness(1);
                    }
                    50% {
                        opacity: 0.5;
                        filter: brightness(1.5);
                    }
                }

                .sparkle-text {
                    animation: sparkle 1.2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
