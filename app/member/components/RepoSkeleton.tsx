export default function RepoSkeleton() {
    return (
        <ul className="border-border-primary1 max-h-[350px] divide-y overflow-y-auto rounded-lg border">
            {Array.from({ length: 5 }).map((_, i) => (
                <li key={i} className="animate-pulse p-4 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 w-full">
                            <div className="w-4 h-4 bg-gray-300 rounded" />
                            <div className="flex flex-col gap-2 w-full">
                                <div className="h-4 bg-gray-300 rounded w-1/2" />
                                <div className="h-3 bg-gray-200 rounded w-1/3" />
                            </div>
                        </div>
                        <div className="h-3 bg-gray-200 rounded w-20" />
                    </div>
                    <div className="h-3 bg-gray-200 rounded mt-2 ml-6 w-3/4" />
                    <div className="h-2 bg-gray-200 rounded mt-2 ml-6 w-24" />
                </li>
            ))
            }
        </ul >
    );
}