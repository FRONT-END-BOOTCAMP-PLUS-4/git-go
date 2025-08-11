"use client";

import { Skeleton } from "./Skeleton";

export default function BadgesSkeleton() {
    return (
        <div className="border-border-primary1 bg-bg-member1 w-full rounded-md border">
            <div className="border-border-primary1 border-b p-4 text-xl font-semibold">
                <Skeleton className="h-6 w-32" />
            </div>
            <div className="p-6">
                <div className="border-border-primary1 border-b pb-4">
                    <Skeleton className="mb-3 h-4 w-24" />
                    <div className="grid grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center gap-2"
                            >
                                <Skeleton className="h-[80px] w-[80px] rounded-full" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border-border-primary1 mt-10 border-b pb-4">
                    <Skeleton className="mb-3 h-4 w-24" />
                    <div className="grid grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center gap-2"
                            >
                                <Skeleton className="h-[80px] w-[80px] rounded-full" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
