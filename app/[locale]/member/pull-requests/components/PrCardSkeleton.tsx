export default function PrCardSkeleton() {
    return (
        <li className="border-border-primary1 animate-pulse border-b p-4 last:border-b-0">
            <article className="flex items-start gap-x-4">
                <div className="bg-bg-skeleton1 h-10 w-10 rounded-full" />

                <div className="flex flex-1 flex-col gap-y-3">
                    <div className="flex items-center gap-x-3">
                        <div className="bg-bg-skeleton2 h-6 w-48 rounded" />
                        <div className="bg-bg-skeleton1 h-5 w-16 rounded" />
                        <div className="bg-bg-skeleton1 ml-auto h-5 w-20 rounded" />
                    </div>

                    <div className="bg-bg-skeleton1 h-4 w-100 rounded" />

                    <div className="flex items-center gap-x-3">
                        <div className="flex items-center gap-x-1">
                            <div className="bg-bg-skeleton1 h-4 w-4 rounded" />
                            <div className="bg-bg-skeleton1 h-4 w-24 rounded" />
                        </div>

                        <div className="flex items-center gap-x-1">
                            <div className="bg-bg-skeleton1 h-4 w-5 rounded" />
                            <div className="bg-bg-skeleton1 h-4 w-20 rounded" />
                        </div>

                        <div className="bg-bg-skeleton1 ml-auto h-8 w-24 rounded" />
                    </div>
                </div>
            </article>
        </li>
    );
}
