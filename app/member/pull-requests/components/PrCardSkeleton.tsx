export default function PrCardSkeleton() {
    return (
        <li className="border-border-primary1 my-1 animate-pulse border-b p-4 last:border-b-0">
            <article className="flex items-start gap-x-4">
                <div className="bg-bg-skeleton1 h-10 w-10 shrink-0 rounded-full" />

                <div className="flex min-w-0 flex-1 flex-col gap-y-2 md:gap-y-1">
                    <div className="text-text-secondary2 mb-3 flex items-center gap-x-3 text-xs">
                        <div className="bg-bg-skeleton2 h-5 w-[60%] rounded md:w-1/2 lg:w-2/5" />
                        <div className="bg-bg-skeleton1 h-5 w-16 rounded shadow-sm" />
                        <div className="bg-bg-skeleton1 ml-auto h-4 w-20 rounded" />
                    </div>

                    <div className="bg-bg-skeleton1 h-4 w-[80%] rounded md:w-[70%]" />

                    <div className="mt-2 flex items-center gap-x-3">
                        <div className="text-text-secondary2 hidden items-center gap-x-1 md:flex">
                            <div className="bg-bg-skeleton1 h-3 w-2 rounded" />
                            <div className="bg-bg-skeleton1 h-4 w-15 rounded" />
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
