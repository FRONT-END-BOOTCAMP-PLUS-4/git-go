export default function MemoirSkeleton() {
    return (
        <li className="border-border-primary1 animate-pulse border-b p-4 last:border-b-0">
            <div className="flex gap-x-4">
                <div className="bg-bg-skeleton2 h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-3 py-1">
                    <div className="flex items-center gap-x-3">
                        <div className="bg-bg-skeleton2 h-4 w-1/8 rounded" />
                        <div className="bg-bg-skeleton1 h-4 w-1/10 rounded" />
                        <div className="bg-bg-skeleton1 ml-auto h-3 w-1/8 rounded" />
                    </div>
                    <div className="flex gap-x-2">
                        <div className="bg-bg-skeleton1 h-4 w-12 rounded" />
                        <div className="bg-bg-skeleton1 h-4 w-10 rounded" />
                        <div className="bg-bg-skeleton1 h-4 w-14 rounded" />
                    </div>
                    <div className="bg-bg-skeleton1 h-4 w-1/2 rounded" />
                    <div className="flex gap-x-3">
                        <div className="bg-bg-skeleton1 h-4 w-1/3 rounded" />
                    </div>
                </div>
            </div>
        </li>
    );
}
