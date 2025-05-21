export default function PrCommitCardSkeleton() {
    return (
        <li className="border-border-primary1 flex animate-pulse flex-col gap-y-1 border-b px-4 py-3 last:border-b-0">
            <div className="flex items-center gap-x-3 text-sm">
                <div className="h-4 w-12 rounded bg-gray-200" />
                <div className="h-4 max-w-100 flex-1 rounded bg-gray-300" />
                <div className="ml-auto h-4 w-20 shrink-0 rounded bg-gray-200" />
            </div>
            <div className="flex items-center gap-x-3 text-xs">
                <div className="h-3 w-20 rounded bg-gray-200" />
                <div className="h-3 w-16 rounded bg-gray-200" />
            </div>
        </li>
    );
}
