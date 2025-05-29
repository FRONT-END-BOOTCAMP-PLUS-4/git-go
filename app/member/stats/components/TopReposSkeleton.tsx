export default function TopReposSkeleton() {
    return (
        <div className="h-full w-full animate-pulse space-y-4">
            <div className="bg-bg-skeleton2 mb-2 h-4 w-1/3 rounded"></div>
            <div className="bg-bg-skeleton1 h-4 w-1/5 rounded"></div>
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <div className="bg-bg-skeleton1 h-4 w-1/3 rounded"></div>
                        <div className="bg-bg-skeleton1 h-4 w-1/6 rounded"></div>
                    </div>
                    <div className="bg-bg-skeleton1 relative h-2 w-full rounded-full">
                        <div className="bg-bg-skeleton2 absolute top-0 left-0 h-full w-1/4 rounded-full"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}
