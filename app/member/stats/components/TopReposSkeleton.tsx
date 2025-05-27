export default function TopReposSkeleton() {
    return (
        <div className="h-full w-full animate-pulse space-y-4">
            <div className="mb-2 h-4 w-1/3 rounded bg-gray-300"></div>
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                        <div className="h-4 w-1/3 rounded bg-gray-200"></div>
                        <div className="h-4 w-1/6 rounded bg-gray-200"></div>
                    </div>
                    <div className="relative h-2 w-full rounded-full bg-gray-100">
                        <div className="absolute top-0 left-0 h-full w-1/4 rounded-full bg-gray-300"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}
