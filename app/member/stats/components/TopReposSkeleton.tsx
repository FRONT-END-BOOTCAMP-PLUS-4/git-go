export default function TopReposSkeleton() {
    return (
        <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded w-1/3 mt-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/6 mt-4"></div>
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-1 animate-pulse">
                    <div className="flex justify-between text-sm">
                        <div className="h-4 bg-gray-300 rounded w-1/3 mt-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/6 mt-4"></div>
                    </div>
                    <div className="bg-gray-200 h-2 w-full rounded-full"></div>
                </div>
            ))}
        </div>
    );
}