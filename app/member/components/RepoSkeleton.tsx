export default function RepoSkeleton() {
    return (
        <ul className="border-border-primary1 max-h-[350px] divide-y overflow-y-auto rounded-md border">
            {Array.from({ length: 5 }).map((_, i) => (
                <li
                    key={i}
                    className="animate-pulse border-b border-gray-200 p-4 last:border-b-0"
                >
                    <div className="flex items-start justify-between">
                        <div className="flex w-full items-center gap-2">
                            <div className="h-4 w-4 rounded bg-gray-300" />
                            <div className="flex w-full flex-col gap-2">
                                <div className="h-4 w-1/2 rounded bg-gray-300" />
                                <div className="h-3 w-1/3 rounded bg-gray-200" />
                            </div>
                        </div>
                        <div className="h-3 w-20 rounded bg-gray-200" />
                    </div>
                    <div className="mt-2 ml-6 h-3 w-3/4 rounded bg-gray-200" />
                    <div className="mt-2 ml-6 h-2 w-24 rounded bg-gray-200" />
                </li>
            ))}
        </ul>
    );
}
