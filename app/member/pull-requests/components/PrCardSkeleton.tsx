export default function PrCardSkeleton() {
    return (
        <li className="border-border-primary1 animate-pulse border-b p-4 last:border-b-0">
            <article className="flex items-start gap-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-200" />

                <div className="flex flex-1 flex-col gap-y-3">
                    <div className="flex items-center gap-x-3">
                        <div className="h-6 w-48 rounded bg-gray-300" />
                        <div className="h-5 w-16 rounded bg-gray-200" />
                        <div className="ml-auto h-5 w-20 rounded bg-gray-200" />
                    </div>

                    <div className="h-4 w-100 rounded bg-gray-200" />

                    <div className="flex items-center gap-x-3">
                        <div className="flex items-center gap-x-1">
                            <div className="h-4 w-4 rounded bg-gray-200" />
                            <div className="h-4 w-24 rounded bg-gray-200" />
                        </div>

                        <div className="flex items-center gap-x-1">
                            <div className="h-4 w-5 rounded bg-gray-200" />
                            <div className="h-4 w-20 rounded bg-gray-200" />
                        </div>

                        <div className="ml-auto h-8 w-24 rounded bg-gray-200" />
                    </div>
                </div>
            </article>
        </li>
    );
}
