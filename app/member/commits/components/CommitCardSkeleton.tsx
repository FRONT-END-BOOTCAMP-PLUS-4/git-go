export function CommitCardSkeleton() {
    return (
        <li className="border-border-primary1 animate-pulse border-b p-4">
            <article className="flex items-start gap-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200" />
                <div className="flex flex-1 flex-col gap-y-1">
                    <div className="text-text-secondary2 mb-3 flex items-center gap-x-3 text-xs">
                        <div className="h-4 w-12 rounded bg-gray-200" />
                        <div className="h-5 w-16 rounded bg-gray-200 shadow-sm" />
                        <div className="ml-auto h-4 w-20 rounded bg-gray-200" />
                    </div>
                    <div className="h-5 w-100 rounded bg-gray-300" />
                    <div className="mt-2 flex items-center gap-x-3">
                        <div className="text-text-secondary2 flex items-center gap-x-1">
                            <div className="h-3 w-3 rounded bg-gray-200" />
                            <div className="h-4 w-20 rounded bg-gray-200" />
                        </div>
                        <div className="text-text-secondary2 flex items-center gap-x-1">
                            <div className="h-3 w-4 rounded bg-gray-200" />
                            <div className="h-4 w-24 rounded bg-gray-200" />
                        </div>
                        <div className="ml-auto h-8 w-24 rounded bg-gray-200" />
                    </div>
                </div>
            </article>
        </li>
    );
}
