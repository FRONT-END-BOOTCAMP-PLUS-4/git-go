export function CommitCardSkeleton() {
    return (
        <li className="border-border-primary1 animate-pulse border-b p-4">
            <article className="flex items-start gap-x-4">
                <div className="bg-bg-skeleton1 flex h-10 w-10 items-center justify-center rounded-full" />
                <div className="flex flex-1 flex-col gap-y-1">
                    <div className="text-text-secondary2 mb-3 flex items-center gap-x-3 text-xs">
                        <div className="bg-bg-skeleton1 h-4 w-12 rounded" />
                        <div className="bg-bg-skeleton1 h-5 w-16 rounded shadow-sm" />
                        <div className="bg-bg-skeleton1 ml-auto h-4 w-20 rounded" />
                    </div>
                    <div className="bg-bg-skeleton2 h-5 w-100 rounded" />
                    <div className="mt-2 flex items-center gap-x-3">
                        <div className="text-text-secondary2 flex items-center gap-x-1">
                            <div className="bg-bg-skeleton1 h-3 w-3 rounded" />
                            <div className="bg-bg-skeleton1 h-4 w-20 rounded" />
                        </div>
                        <div className="text-text-secondary2 flex items-center gap-x-1">
                            <div className="bg-bg-skeleton1 h-3 w-4 rounded" />
                            <div className="bg-bg-skeleton1 h-4 w-24 rounded" />
                        </div>
                        <div className="bg-bg-skeleton1 ml-auto h-8 w-24 rounded" />
                    </div>
                </div>
            </article>
        </li>
    );
}
