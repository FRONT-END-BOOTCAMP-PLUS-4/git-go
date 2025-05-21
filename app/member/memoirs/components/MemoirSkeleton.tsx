export default function MemoirSkeleton() {
    return (
        <li className="animate-pulse border-b border-border-primary1 p-4 last:border-b-0">
            <div className="flex gap-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-3 py-1">
                    <div className="flex items-center gap-x-3">
                        <div className="h-4 w-1/8 rounded bg-gray-200" />
                        <div className="h-4 w-1/10 rounded bg-gray-100" />
                        <div className="ml-auto h-3 w-1/8 rounded bg-gray-100" />
                    </div>
                    <div className="flex gap-x-2">
                        <div className="h-4 w-12 rounded bg-gray-100" />
                        <div className="h-4 w-10 rounded bg-gray-100" />
                        <div className="h-4 w-14 rounded bg-gray-100" />
                    </div>
                    <div className="h-4 w-1/2 rounded bg-gray-100" />
                    <div className="flex gap-x-3">
                        <div className="h-4 w-1/3 rounded bg-gray-100" />
                    </div>
                </div>
            </div>
        </li>
    );
}